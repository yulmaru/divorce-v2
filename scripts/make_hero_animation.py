from pathlib import Path

import cv2
import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SOURCES = [
    ASSETS / "hero-mother-daughter-sunset-frame-1.png",
    ASSETS / "hero-mother-daughter-sunset-frame-2.png",
    ASSETS / "hero-mother-daughter-sunset-frame-3.png",
]
OUTPUT = ASSETS / "hero-mother-daughter-sunset.mp4"
SIZE = (1280, 720)
FPS = 24
FRAMES_PER_STEP = 30


def cover(path: Path) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    fitted = ImageOps.fit(image, SIZE, method=Image.Resampling.LANCZOS)
    return np.asarray(fitted)


def ease(value: float) -> float:
    return value * value * (3.0 - 2.0 * value)


def optical_flow(first: np.ndarray, second: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    first_gray = cv2.cvtColor(first, cv2.COLOR_RGB2GRAY)
    second_gray = cv2.cvtColor(second, cv2.COLOR_RGB2GRAY)
    forward = cv2.calcOpticalFlowFarneback(
        first_gray, second_gray, None, 0.5, 4, 25, 4, 7, 1.5, 0
    )
    backward = cv2.calcOpticalFlowFarneback(
        second_gray, first_gray, None, 0.5, 4, 25, 4, 7, 1.5, 0
    )
    return forward, backward


def interpolate(
    first: np.ndarray,
    second: np.ndarray,
    forward: np.ndarray,
    backward: np.ndarray,
    progress: float,
) -> np.ndarray:
    height, width = first.shape[:2]
    grid_x, grid_y = np.meshgrid(
        np.arange(width, dtype=np.float32), np.arange(height, dtype=np.float32)
    )
    first_x = grid_x - (forward[..., 0] * progress)
    first_y = grid_y - (forward[..., 1] * progress)
    second_x = grid_x - (backward[..., 0] * (1.0 - progress))
    second_y = grid_y - (backward[..., 1] * (1.0 - progress))
    warped_first = cv2.remap(
        first, first_x, first_y, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT
    )
    warped_second = cv2.remap(
        second, second_x, second_y, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT
    )
    return cv2.addWeighted(
        warped_first, 1.0 - progress, warped_second, progress, 0.0
    )


keyframes = [cover(path) for path in SOURCES]
pairs = [
    (keyframes[0], keyframes[1]),
    (keyframes[1], keyframes[2]),
    (keyframes[2], keyframes[0]),
]

with imageio.get_writer(
    OUTPUT,
    fps=FPS,
    codec="libx264",
    pixelformat="yuv420p",
    ffmpeg_params=["-crf", "21", "-preset", "medium", "-movflags", "+faststart"],
) as writer:
    for first, second in pairs:
        forward, backward = optical_flow(first, second)
        for index in range(FRAMES_PER_STEP):
            linear = index / FRAMES_PER_STEP
            frame = interpolate(first, second, forward, backward, ease(linear))
            writer.append_data(frame)

print(
    f"Created {OUTPUT} ({OUTPUT.stat().st_size} bytes, "
    f"{len(pairs) * FRAMES_PER_STEP} frames at {FPS} fps)"
)

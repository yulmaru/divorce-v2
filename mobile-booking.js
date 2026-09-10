const bookingButtons = document.querySelectorAll(".mobile-reserve, .quick-reserve, .mobile-chat, .quick-chat");
const bookingMenus = document.querySelectorAll(".mobile-booking-menu, .quick-booking-menu, .mobile-chat-menu, .quick-chat-menu");

function menuFor(button) {
  return document.getElementById(button.getAttribute("aria-controls"));
}

function closeBookingMenus({ restoreFocus = false } = {}) {
  bookingButtons.forEach(button => {
    const menu = menuFor(button);
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  });
}

bookingButtons.forEach(button => {
  button.addEventListener("click", event => {
    event.stopPropagation();
    const menu = menuFor(button);
    if (!menu) return;
    const willOpen = menu.hidden;
    closeBookingMenus();
    menu.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

bookingMenus.forEach(menu => {
  menu.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target.closest("a")) closeBookingMenus();
  });
});

document.addEventListener("click", () => closeBookingMenus());
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeBookingMenus({ restoreFocus: true });
});

document.querySelectorAll('.quick-menu a[href="#top"]').forEach(topLink => {
  topLink.addEventListener("click", event => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  });
});

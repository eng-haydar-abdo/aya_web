(() => {
  const motion = window.Motion;
  if (!motion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const { animate, inView } = motion;
  const ease = [0.22, 1, 0.36, 1];
  const hero = document.querySelector(".hero");
  if (hero) {
    animate(hero, { opacity: [0, 1], y: [18, 0], scale: [0.985, 1] }, {
      duration: 0.75,
      ease
    });
  }

  document.querySelectorAll(".panel").forEach((panel) => {
    inView(panel, (element) => {
      animate(element, { opacity: [0, 1], y: [22, 0] }, {
        duration: 0.65,
        ease
      });
    }, { amount: 0.12 });
  });

  document.querySelectorAll(".routine-card").forEach((card, index) => {
    inView(card, (element) => {
      animate(element, { opacity: [0, 1], y: [14, 0], scale: [0.98, 1] }, {
        duration: 0.5,
        delay: (index % 4) * 0.07,
        ease
      });
    }, { amount: 0.15 });
  });
})();

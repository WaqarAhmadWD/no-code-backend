export const toggable = (targetClass, toggleClasses) => {
  return () => {
    const elements = document.querySelectorAll(`.${targetClass}`);
    const classList = toggleClasses.split(" "); // Split space-separated classes

    elements.forEach((element) => {
      classList.forEach((cls) => {
        element.classList.toggle(cls); // Toggle each class
      });
    });
  };
};

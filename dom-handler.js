
// Esta constante manipula al DOM y permite el renderizado de los componentes deseados y el funcionmiento
// de los listeners.
const DOMHandler = function (parentSelector) {
  const parent = document.querySelector(parentSelector);

  if (!parent) throw new Error("Parent not found");

  return {
    module: null,
    load(module) {
      this.module = module;
      parent.innerHTML = module;
      module.addListeners();
    },
    reload() {
      this.load(this.module);
    },
  };
};

export default DOMHandler;
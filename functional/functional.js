(function () {
  let state = undefined;

  function useState(initialValue) {
    state = state || initialValue;

    function setValue(newValue) {
      state = newValue;
      renderApp();
    }

    return [state, setValue];
  }

  function createElement(elementData) {
    const element = document.createElement(`${elementData.tag}`);
    if (elementData.eventParameters) {
      element.addEventListener(
        `${elementData.eventParameters.name}`,
        elementData.eventParameters.callback
      );
    }
    if (elementData.classList) {
      element.classList.add(elementData.class);
    }
    if (elementData.text) {
      element.innerHTML = elementData.text;
    }
    if (elementData.attribute) {
      elementData.attribute.forEach((el) => {
        element.setAttribute(`${el.attributeName}`, `${el.attributeValue}`);
      });
    }
    if (elementData.parent) {
      elementData.parent.append(element);
    }
    if (elementData.child) {
      element.append(elementData.child);
    }
    return element;
  }
  function App() {
    const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

    function addItem() {
      setItems([...items, `Item ${items.length + 1}`]);
    }

    const div = document.createElement("div");
    div.classList.add("main");

    createElement({ tag: "h2", parent: div, text: "To Do Tasks" });

    const andInputSearch = document.createElement("div");

    createElement({
      tag: "input",
      attribute: [{ attributeName: "type", attributeValue: "text" }],
      parent: andInputSearch,
      eventParameters: { name: "onclick", callback: () => {} },
    });

    createElement({
      tag: "button",
      text: "+ New Task",
      eventParameters: { name: "onclick", callback: addItem },
      parent: andInputSearch,
    });

    div.append(andInputSearch);

    createElement({ tag: "p", text: "All Tasks", parent: div });

    const andInputUlButton = document.createElement("div");

    for (let i = 0; i < items.length; i++) {
      const ul = createElement({ tag: "div", parent: andInputUlButton });
      createElement({
        tag: "input",
        attribute: [{ attributeName: "type", attributeValue: "checkbox" }],
        parent: ul,
      });

      createElement({
        tag: "li",
        text: items[i],
        parent: ul,
      });

      createElement({
        tag: "button",
        text: "delete",
        eventParameters: { name: "onclick", callback: () => {} },
        parent: ul,
      });
    }

    div.append(andInputUlButton);

    createElement({ tag: "p", text: "Completed Tasks", parent: div });

    return div;
  }

  function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  renderApp();
})();

// letrs try it out this shit is sick!!

function createElement(elementData) {
  const element = document.createElement(`${elementData.tag}`);
  if (elementData.eventParameters) {
    element.addEventListener(
      `${elementData.eventParameters.name}`,
      elementData.eventParameters.callback
    );
  }
  if (elementData.classList) {
    element.classList.add(elementData.class);
  }
  if (elementData.text) {
    element.innerHTML = elementData.text;
  }
  if (elementData.attribute) {
    elementData.attribute.forEach((el) => {
      element.setAttribute(`${el.attributeName}`, `${el.attributeValue}`);
    });
  }
  if (elementData.parent) {
    elementData.parent.append(element);
  }
  if (elementData.child) {
    element.append(elementData.child);
  }
  if (elementData.children) {
    elementData.children.forEach((el) => {
      element.createElement(el);
    });
  }
  return element;
}

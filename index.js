const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

const cartItemList = document.querySelector(".cart--item-list");
const shopItemList = document.querySelector(".store--item-list");

// Setters and getters
const getItem = (itemName) => {
  return state.items.find((item) => itemName === item.name);
};

const setState = (updatedState) => {
  Object.keys(updatedState).forEach((prop) => {
    state[prop] = updatedState[prop];
  });

  render();
};

// Reusable functions
const createImg = (item) => {
  const img = document.createElement("img");
  const imgSrc = `assets/icons/${item.id}.svg`;
  img.setAttribute("src", imgSrc);
  img.setAttribute("alt", item.name);

  return img;
};

const createButton = () => {
  const button = document.createElement("button");
  return button;
};

const createCartBtn = () => {
  const btn = createButton();
  btn.classList.add("quantity-btn");
  btn.classList.add("center");
  return btn;
};

// Shelf Item
const createShopItem = (item) => {
  const li = document.createElement("li");

  const imgContainer = document.createElement("div");
  li.append(imgContainer);
  imgContainer.classList.add("store--item-icon");

  const img = createImg(item);
  imgContainer.append(img);

  const button = createButton();
  li.append(button);
  button.classList.add("add-to-cart-btn");
  button.innerText = "Add to cart";

  return li;
};

const generateShelf = () => {
  const myShelf = [...state.items];

  myShelf.forEach((item) => {
    shopItemList.append(createShopItem(item));
  });

  return shopItemList;
};

// Cart Item
const createCartItem = (item) => {
  const li = document.createElement("li");

  const img = createImg(item);
  li.append(img);
  img.classList.add("cart--item-icon");

  const nameEl = document.createElement("p");
  li.append(nameEl);
  nameEl.innerText = item.name;

  const removeButton = createCartBtn();
  li.append(removeButton);
  removeButton.innerText = "-";
  removeButton.classList.add("remove-btn");

  const quantityEl = document.createElement("span");
  li.append(quantityEl);
  quantityEl.classList.add("quantity-text");
  quantityEl.classList.add("center");

  const addButton = createCartBtn();
  li.append(addButton);
  addButton.innerText = "+";
  addButton.classList.add("add-btn");

  return li;
};

const generateCartList = () => {
  cartItemList.innerHTML = "";

  myCartItems = [...state.cart];

  myCartItems.forEach((item) => {
    const cartItem = createCartItem(item);
    cartItemList.append(cartItem);
    const quantitySpan = cartItem.querySelector(".quantity-text");
    quantitySpan.innerText = item.quantity;
  });

  return cartItemList;
};

const render = () => {
  generateShelf();
  generateCartList();
};

render();

// Reusable functions for event listeners
const addToCart = (itemName) => {
  const myCart = [...state.cart];

  const match = myCart.find((item) => itemName === item.name);

  if (match) {
    match.quantity++;
    setState({ cart: myCart });
    console.log(myCart);
    return;
  }

  const thisItem = getItem(itemName);
  thisItem.quantity = 1;
  myCart.push(thisItem);

  setState({ cart: myCart });
};

// Add event listeners to all shelf buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

const addListeners = (buttons) => {
  buttons.forEach((btn) => addListener(btn));
};

const addListener = (btn) => {
  btn.addEventListener("click", (event) => {
    const thisItemName = event.path[1].children[0].children[0].alt;
    console.log(thisItemName);
    addToCart(thisItemName);
  });
};
addListeners(addToCartButtons);

// Add event listeners to cart buttons
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");

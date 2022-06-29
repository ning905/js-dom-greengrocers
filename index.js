const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
      price: 0.35,
    },
  ],
  cart: [],
};

const cartItemList = document.querySelector(".cart--item-list");
const shopItemList = document.querySelector(".store--item-list");

// Setters and getters
const getItemFromShelf = (itemName) => {
  return state.items.find((item) => itemName === item.name);
};

const getItemFromCart = (itemName, cart = state.cart) => {
  return cart.find((item) => itemName === item.name);
};

const setState = (updatedState) => {
  Object.keys(updatedState).forEach((prop) => {
    state[prop] = updatedState[prop];
  });

  render();
};

// Reusable functions for event listeners
const increaseQuantity = (itemName) => {
  const myCart = [...state.cart];
  const thisItem = getItemFromCart(itemName, myCart);
  thisItem.quantity++;

  setState({ cart: myCart });
};

const decreaseQuantity = (itemName) => {
  let myCart = [...state.cart];
  const thisItem = getItemFromCart(itemName, myCart);
  thisItem.quantity--;

  myCart = myCart.filter((item) => item.quantity > 0);

  setState({ cart: myCart });
};

const addToCart = (itemName) => {
  const myCart = [...state.cart];

  const match = myCart.find((item) => itemName === item.name);

  if (match) {
    increaseQuantity(itemName);
    return;
  }

  const thisItem = getItemFromShelf(itemName);
  thisItem.quantity = 1;
  myCart.push(thisItem);

  setState({ cart: myCart });
};

// Reusable functions for creating elements
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

// Header
const header = document.querySelector("#store");

const filterButtonContainer = document.createElement("div");
header.insertBefore(filterButtonContainer, header.children[1]);
filterButtonContainer.style.display = "flex";
filterButtonContainer.style.justifyContent = "center";
filterButtonContainer.style.margin = "1rem";
filterButtonContainer.style.columnGap = "2rem";

const fruitBtn = createButton();
filterButtonContainer.appendChild(fruitBtn);
fruitBtn.innerText = "Show Fruits";
fruitBtn.addEventListener("click", (event) => {
  const fruits = state.items.filter((item) => item.type === "fruit");
  renderShelf(fruits);
});

const vegeBtn = createButton();
filterButtonContainer.appendChild(vegeBtn);
vegeBtn.innerText = "Show Vegetables";
vegeBtn.addEventListener("click", (event) => {
  const vegetable = state.items.filter((item) => item.type === "vegetable");
  renderShelf(vegetable);
});

const allItemsBtn = createButton();
filterButtonContainer.appendChild(allItemsBtn);
allItemsBtn.innerText = "Show All Items";
allItemsBtn.addEventListener("click", (event) => {
  renderShelf();
});

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
  button.addEventListener("click", (event) => {
    const thisItemName = event.composedPath()[1].children[0].children[0].alt;
    addToCart(thisItemName);
  });

  return li;
};

const renderShelf = (items = state.items) => {
  shopItemList.innerHTML = "";

  const myShelf = [...items];

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
  removeButton.addEventListener("click", (event) => {
    const thisItemName = event.composedPath()[1].children[1].innerText;
    decreaseQuantity(thisItemName);
  });

  const quantityEl = document.createElement("span");
  li.append(quantityEl);
  quantityEl.classList.add("quantity-text");
  quantityEl.classList.add("center");

  const addButton = createCartBtn();
  li.append(addButton);
  addButton.innerText = "+";
  addButton.classList.add("add-btn");
  addButton.addEventListener("click", (event) => {
    const thisItemName = event.composedPath()[1].children[1].innerText;
    increaseQuantity(thisItemName);
  });

  return li;
};

const renderCartList = () => {
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

// Total cost
const totalCostEl = document.querySelector(".total-number");

const getItemCost = (item) => {
  return item.price * item.quantity;
};

const getTotalCost = () => {
  const myCart = [...state.cart];
  let totalCost = 0;
  for (const item of myCart) {
    totalCost += getItemCost(item);
  }
  return totalCost;
};

const renderTotalCost = () => {
  const totalCost = getTotalCost().toFixed(2);
  totalCostEl.innerText = `£${totalCost}`;
};

const render = () => {
  renderShelf();
  renderCartList();
  renderTotalCost();
};

render();

const storageKey = "strange-little-things-demo-products";
const form = document.querySelector("#product-form");
const list = document.querySelector("#admin-products");
const exportButton = document.querySelector("#export-json");
const clearButton = document.querySelector("#clear-demo");

function getProducts() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem(storageKey, JSON.stringify(products));
  render();
}

function addText(parent, tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  parent.append(element);
}

function render() {
  const products = getProducts();
  if (!list) return;
  list.replaceChildren();

  if (!products.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No browser-only demo listings yet.";
    list.append(empty);
    return;
  }

  products.forEach((product, index) => {
    const article = document.createElement("article");
    article.className = "admin-product";

    const image = document.createElement("img");
    image.src = `../${product.image}`;
    image.alt = product.alt;

    const copy = document.createElement("div");
    addText(copy, "h3", product.name);
    addText(copy, "p", `${product.category} · ${product.price || "No price"} · Qty ${product.quantity}`);
    addText(copy, "small", product.description);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.remove = String(index);
    remove.textContent = "Remove";

    article.append(image, copy, remove);
    list.append(article);
  });
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const products = getProducts();
  products.push({
    id: crypto.randomUUID(),
    name: String(data.get("name") || "").trim(),
    category: String(data.get("category") || "Other Little Things"),
    price: String(data.get("price") || "Ask Lisa").trim(),
    quantity: Number(data.get("quantity") || 1),
    description: String(data.get("description") || "").trim(),
    image: String(data.get("image") || "assets/plant-closeup.webp").trim(),
    alt: String(data.get("alt") || "Product image").trim(),
    purchaseUrl: String(data.get("purchaseUrl") || "").trim(),
    status: "Draft"
  });
  saveProducts(products);
  form.reset();
});

list?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const button = event.target.closest("[data-remove]");
  if (!(button instanceof HTMLButtonElement)) return;
  const products = getProducts();
  products.splice(Number(button.dataset.remove), 1);
  saveProducts(products);
});

exportButton?.addEventListener("click", () => {
  const products = getProducts();
  const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "products-demo-export.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

clearButton?.addEventListener("click", () => {
  const confirmed = window.confirm("Clear the browser-only demo listings on this device?");
  if (confirmed) saveProducts([]);
});

render();

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation?.classList.toggle("is-open", !open);
});

navigation?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navigation.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.json();
}

function textElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}

function createProductCard(product, config) {
  const article = document.createElement("article");
  article.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.alt;
  image.loading = "lazy";
  image.width = 900;
  image.height = 760;
  imageWrap.append(image, textElement("span", "product-badge", product.status));

  const body = document.createElement("div");
  body.className = "product-body";

  const meta = document.createElement("div");
  meta.className = "product-meta";
  meta.append(textElement("span", "", product.category), textElement("span", "", product.price));

  const actions = document.createElement("div");
  actions.className = "product-actions";

  const purchaseLink = product.purchaseUrl || config.facebookUrl || "";
  const link = document.createElement("a");
  link.className = "button button-primary";
  if (purchaseLink) {
    link.href = purchaseLink;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Ask about this one";
  } else {
    link.href = "#facebook";
    link.classList.add("is-disabled");
    link.setAttribute("aria-disabled", "true");
    link.textContent = "Sales link coming soon";
  }
  actions.append(link);

  body.append(
    meta,
    textElement("h3", "", product.name),
    textElement("p", "", product.description),
    actions
  );

  article.append(imageWrap, body);
  return article;
}

async function initialize() {
  try {
    const [config, products] = await Promise.all([
      loadJson("site-config.json"),
      loadJson("products.json")
    ]);

    document.querySelectorAll(".facebook-link").forEach((link) => {
      if (!(link instanceof HTMLAnchorElement)) return;
      if (config.facebookUrl) {
        link.href = config.facebookUrl;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Follow on Facebook";
        link.classList.remove("is-disabled");
        link.removeAttribute("aria-disabled");
      }
    });

    const grid = document.querySelector("#product-grid");
    products.forEach((product) => grid?.append(createProductCard(product, config)));
  } catch (error) {
    const grid = document.querySelector("#product-grid");
    if (grid) {
      const message = document.createElement("p");
      message.setAttribute("role", "alert");
      message.textContent = `The demo products could not be loaded. ${error instanceof Error ? error.message : "Unknown error"}`;
      grid.replaceChildren(message);
    }
  }
}

initialize();

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

  const illustration = document.createElement("div");
  illustration.className = `placeholder-art placeholder-${product.motif}`;
  illustration.setAttribute("role", "img");
  illustration.setAttribute("aria-label", `Decorative ${product.category} listing placeholder`);
  illustration.innerHTML = '<span class="placeholder-moon" aria-hidden="true">☾</span><span class="placeholder-plant" aria-hidden="true">❧</span><span class="placeholder-stars" aria-hidden="true">✦ · ✧</span>';
  const approvedImage = typeof product.image === "string" && /^assets\/products\/[a-z0-9_-]+\.(webp|png|jpg|jpeg)$/i.test(product.image) && !product.image.includes("..");
  if (approvedImage && typeof product.imageAlt === "string" && product.imageAlt.trim()) {
    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.imageAlt.trim();
    image.loading = "lazy";
    imageWrap.append(image);
  } else {
    imageWrap.append(illustration);
  }
  const soldOut = (product.quantity !== undefined && product.quantity !== null && product.quantity !== "" && Number(product.quantity) <= 0) || /^sold[ -]?out$/i.test(String(product.status || ""));
  imageWrap.append(textElement("span", "product-badge", soldOut ? "Sold out" : String(product.status || "Available")));

  const body = document.createElement("div");
  body.className = "product-body";

  const meta = document.createElement("div");
  meta.className = "product-meta";
  meta.append(textElement("span", "", product.category), textElement("span", "", product.price));

  const actions = document.createElement("div");
  actions.className = "product-actions";

  const validUrl = (value) => {
    try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : ""; }
    catch { return ""; }
  };
  const purchaseLink = validUrl(product.purchaseUrl) || validUrl(config.facebookUrl);
  const link = document.createElement("a");
  link.className = "button button-primary";
  if (soldOut) {\n    link.removeAttribute("href");\n    link.classList.add("is-disabled");\n    link.setAttribute("aria-disabled", "true");\n    link.textContent = "Sold out";\n  } else if (purchaseLink) {
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
    if (!Array.isArray(products)) throw new Error("Invalid product catalog");
    let selectedCategory = "";
    const groupOf = (product) => {
      const category = String(product.category || "").toLowerCase();
      if (category.includes("air plant")) return "Air Plants";
      if (category.includes("succulent")) return "Succulents";
      return "Curious Creations";
    };
    const render = () => {
      const shown = selectedCategory ? products.filter((p) => groupOf(p) === selectedCategory) : products;
      grid?.replaceChildren(...(shown.length
        ? shown.map((p) => createProductCard(p, config))
        : [textElement("p", "empty-products", "No items in this category yet.")]));
      const reset = document.querySelector("#show-all");
      if (reset) reset.hidden = !selectedCategory;
      document.querySelectorAll("[data-category]").forEach((link) => {
        if (link.dataset.category === selectedCategory) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    document.querySelectorAll("[data-category]").forEach((link) => link.addEventListener("click", () => {
      selectedCategory = link.dataset.category || "";
      render();
    }));
    document.querySelector("#show-all")?.addEventListener("click", () => {
      selectedCategory = "";
      render();
    });
    render();
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

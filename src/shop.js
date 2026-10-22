(async () => {
  const status = document.querySelector("#shop-status");
  const mount = document.querySelector("#ecwid-store");
  const fail = () => {
    if (status) status.hidden = false;
    if (mount) mount.hidden = true;
  };
  try {
    const response = await fetch("shop-config.json", {cache:"no-store"});
    if (!response.ok) return fail();
    const config = await response.json();
    if (!config.enabled) return;
    if (config.provider !== "ecwid" || !Number.isSafeInteger(config.storeId) || config.storeId <= 0) return fail();
    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;
    const script = document.createElement("script");
    script.src = "https://app.ecwid.com/script.js?" + encodeURIComponent(String(config.storeId)) + "&data_platform=code";
    script.async = true;
    script.onload = () => {
      if (typeof window.xProductBrowser !== "function") return fail();
      mount.hidden = false;
      status.hidden = true;
      window.xProductBrowser("categoriesPerRow=3", "views=grid(20,3) list(60)", "categoryView=grid", "searchView=list", "id=ecwid-store");
    };
    script.onerror = fail;
    document.head.append(script);
  } catch { fail(); }
})();

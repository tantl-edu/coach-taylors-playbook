const isHosted = window.location.protocol === "https:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

if ("serviceWorker" in navigator && isHosted) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("Playbook service worker registration failed.", error);
    });
  });
}

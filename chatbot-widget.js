(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  // Povolene domény
  const allowed = ["aipower.site"];
  if (!allowed.includes(window.location.hostname)) {
    console.warn("Tento widget nie je povolený na tejto doméne");
    return; // NEvytvára iframe
  }

  const iframe = document.createElement("iframe");
  iframe.src = "https://ai-power2-0.vercel.app/"; // tvoje Vercel URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "550px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "18px";
  iframe.style.zIndex = "99999";
  iframe.style.boxShadow = "0 10px 25px rgba(0,0,0,0.0)";
  document.body.appendChild(iframe);
})();

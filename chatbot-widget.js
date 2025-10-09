(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  const allowed = ["aipower.site"];
  if (!allowed.includes(window.location.hostname)) {
    console.warn("Tento widget nie je povolený na tejto doméne");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = "https://ai-power2-0.vercel.app"; // tvoj originálny chatbot
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
  iframe.setAttribute("referrerpolicy", "no-referrer");
  iframe.setAttribute("allow", "microphone; clipboard-write; autoplay");
  iframe.setAttribute("loading", "lazy");
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("scrolling", "no");

  iframe.style.cssText = `
    all: initial !important;
    position: fixed !important;
    bottom: 20px !important;
    right: 20px !important;
    width: 60px !important;
    height: 60px !important;
    border: none !important;
    border-radius: 50% !important;
    z-index: 2147483647 !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
    overflow: hidden !important;
    display: block !important;
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    transition: all 0.4s ease !important;
    pointer-events: auto !important;
  `;

  document.body.appendChild(iframe);

  function getResponsiveSizes() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw <= 480) {
      return { openWidth: `${vw - 10}px`, openHeight: `${vh * 0.75}px`, closedWidth: "60px", closedHeight: "60px", bottom: "5px", right: "5px", left: "5px" };
    } else if (vw <= 768) {
      return { openWidth: `${vw - 20}px`, openHeight: `${vh * 0.7}px`, closedWidth: "60px", closedHeight: "60px", bottom: "10px", right: "10px", left: "10px" };
    } else {
      return { openWidth: "360px", openHeight: "600px", closedWidth: "60px", closedHeight: "60px", bottom: "20px", right: "20px", left: "auto" };
    }
  }

  function applyResponsiveSizes(isOpen = false) {
    const s = getResponsiveSizes();
    iframe.style.transition = "all 0.4s ease";
    if (isOpen) {
      iframe.style.width = s.openWidth;
      iframe.style.height = s.openHeight;
      iframe.style.borderRadius = "20px";
      iframe.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
      if (window.innerWidth <= 768) {
        iframe.style.left = s.left;
        iframe.style.right = "auto";
      } else {
        iframe.style.left = "auto";
        iframe.style.right = s.right;
      }
    } else {
      iframe.style.width = s.closedWidth;
      iframe.style.height = s.closedHeight;
      iframe.style.borderRadius = "50%";
      iframe.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      iframe.style.left = "auto";
      iframe.style.right = s.right;
    }
    iframe.style.bottom = s.bottom;
  }

  let isOpen = false;

  window.addEventListener("message", (event) => {
    if (event.origin !== "https://ai-power2-0.vercel.app") return;
    if (event.data.type === "chatbot-opened") {
      isOpen = true;
      applyResponsiveSizes(true);
    } else if (event.data.type === "chatbot-closed") {
      isOpen = false;
      applyResponsiveSizes(false);
    }
  });

  window.addEventListener("resize", () => applyResponsiveSizes(isOpen));
  applyResponsiveSizes(false);
})();

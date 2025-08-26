<!-- Include this in your parent HTML or chatbot-widget.js -->
<script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent@5.5.3"></script>
<script>
  (function () {
    if (window.marcelChatbotLoaded) return;
    window.marcelChatbotLoaded = true;

    const allowed = ["aipower.site"];
    if (!allowed.includes(window.location.hostname)) {
      console.warn("Widget not allowed on this domain");
      return;
    }

    const target = document.body; // or specify a container
    const iframe = document.createElement("iframe");
    iframe.id = "myChatbotIframe";
    iframe.src = "https://ai-power2-0.vercel.app/";
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px";
    iframe.style.right = "20px";
    iframe.style.width = "400px";
    iframe.style.height = "550px"; // fallback
    iframe.style.border = "none";
    iframe.style.borderRadius = "18px";
    iframe.style.zIndex = "99999";
    iframe.style.boxShadow = "0 10px 25px rgba(0,0,0,0.0)";
    target.appendChild(iframe);

    iframeResize({
      log: false,
      autoResize: true,
      checkOrigin: false,
      // license: 'GPLv3', // optional if open-source
    }, "#myChatbotIframe");
  })();
</script>

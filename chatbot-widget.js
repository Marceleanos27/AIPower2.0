(function () {
  if (window.marcelChatbotLoaded) return;
  window.marcelChatbotLoaded = true;

  const iframe = document.createElement("iframe");
  iframe.src = "https://ai-power2-0.vercel.app/"; // ⬅️ Change to your real URL (e.g. Vercel)
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.border = "none";
  iframe.style.zIndex = "99999";
  iframe.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  iframe.style.transition = "all 0.3s ease";
  
  // Štart v minimalizovanom stave
  iframe.style.width = "70px";
  iframe.style.height = "70px";
  iframe.style.borderRadius = "50%";
  
  // Komunikácia s iframe obsahom
  window.addEventListener("message", function(event) {
    if (event.origin !== "https://ai-power2-0.vercel.app/") return;
    
    if (event.data.type === "chatbot-opened") {
      // Chatbot otvorený - veľké okno
      iframe.style.width = "400px";
      iframe.style.height = "550px";
      iframe.style.borderRadius = "18px";
    } else if (event.data.type === "chatbot-closed") {
      // Chatbot zatvorený - malý kruhový button
      iframe.style.width = "70px";
      iframe.style.height = "70px";
      iframe.style.borderRadius = "50%";
    }
  });
  
  document.body.appendChild(iframe);
})();

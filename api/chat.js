export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, useRAG = false, ragContext = '', sources = [] } = req.body;

  try {
    let enhancedMessages = [...messages];
    
    // Ak je povolený RAG, pridaj kontext do poslednej user správy
    if (useRAG && ragContext) {
      const lastUserIndex = enhancedMessages.length - 1;
      if (enhancedMessages[lastUserIndex] && enhancedMessages[lastUserIndex].role === 'user') {
        const originalQuestion = enhancedMessages[lastUserIndex].content;
        enhancedMessages[lastUserIndex].content = `${ragContext}\n\nOtázka zákazníka: ${originalQuestion}`;
      }
    }

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "Qwen/Qwen3-235B-A22B-Instruct-2507-tput",
        messages: enhancedMessages,
        temperature: 0.4, // Vyvážená teplota pre prirodzenejšie odpovede
        max_tokens: 500,
        top_p: 0.8,     // Obmedzenie variability
        stop: null,
        repetition_penalty: 1.1
      })
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
}

export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    // Konvertovanie messages formátu pre Gemini API
    const geminiMessages = messages
      .filter(msg => msg.role !== 'system') // Gemini nemá system role
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // System prompt sa pridá ako prvá user správa
    const systemMessage = messages.find(msg => msg.role === 'system');
    if (systemMessage) {
      geminiMessages.unshift({
        role: 'user',
        parts: [{ text: systemMessage.content }]
      });
      geminiMessages.splice(1, 0, {
        role: 'model',
        parts: [{ text: 'Rozumiem, budem postupovať podľa týchto inštrukcií.' }]
      });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.8,
          topK: 40
        }
      })
    });

    const data = await response.json();
    
    // Konvertovanie Gemini odpovede na OpenAI formát
    const geminiResponse = {
      choices: [{
        message: {
          role: 'assistant',
          content: data.candidates?.[0]?.content?.parts?.[0]?.text || "Prepáč, neviem na to odpovedať."
        }
      }]
    };

    res.status(200).json(geminiResponse);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
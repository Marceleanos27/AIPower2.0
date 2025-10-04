export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, useRAG = false, ragContext = '', sources = [], language = 'sk' } = req.body;

  try {
    let enhancedMessages = [...messages];
    
    // Systémový prompt podľa jazyka
    const systemPrompts = {
      sk: {
        role: "system",
        content: `Si inteligentný AI asistent pre firmu AI Power (https://www.aipower.site). Tvoja úloha je pomáhať zákazníkom s informáciami o AI chatbotoch, cenách a službách.

DÔLEŽITÉ PRAVIDLÁ:
- Odpovedaj vždy v SLOVENČINE
- Buď priateľský, profesionálny a konkrétny
- Používaj informácie z poskytnutého kontextu
- Ak nevieš presne odpovedať, ponúkni kontakt alebo rezerváciu konzultácie
- Používaj emojis pre lepšiu čitateľnosť (💰 pre ceny, 📞 pre kontakt, 📅 pre stretnutie)
- Formátuj odpovede s **bold** textom pre dôležité informácie`
      },
      en: {
        role: "system",
        content: `You are an intelligent AI assistant for AI Power company (https://www.aipower.site). Your role is to help customers with information about AI chatbots, pricing, and services.

IMPORTANT RULES:
- Always respond in ENGLISH
- Be friendly, professional, and specific
- Use information from the provided context
- If you can't answer precisely, offer contact details or consultation booking
- Use emojis for better readability (💰 for prices, 📞 for contact, 📅 for meetings)
- Format answers with **bold** text for important information

KEY INFORMATION:
- Company: AI Power, founded 2025 by Marcel Lehocky
- Location: Bratislava, Slovakia
- Email: info@aipower.site
- Phone: +421 904 603 171
- Pricing: €69/month (yearly, save 20%) or €79/month
- Delivery: 3-5 days from start to finish
- Features: Custom chatbot, 24/7 availability, 100% Slovak language, lead collection, unlimited conversations
- Free consultation: https://calendly.com/aipoweragency/new-meeting?month=2025-08`
      }
    };

    // Pridaj systémový prompt na začiatok, ak ešte nie je
    if (enhancedMessages[0]?.role !== 'system') {
      enhancedMessages.unshift(systemPrompts[language] || systemPrompts.sk);
    } else {
      // Ak už existuje systémový prompt, aktualizuj ho
      enhancedMessages[0] = systemPrompts[language] || systemPrompts.sk;
    }
    
    // Ak je povolený RAG, pridaj kontext do poslednej user správy
    if (useRAG && ragContext) {
      const lastUserIndex = enhancedMessages.length - 1;
      if (enhancedMessages[lastUserIndex] && enhancedMessages[lastUserIndex].role === 'user') {
        const originalQuestion = enhancedMessages[lastUserIndex].content;
        const contextLabel = language === 'en' ? 'Knowledge Base Context' : 'Kontext z databázy znalostí';
        const questionLabel = language === 'en' ? 'Customer question' : 'Otázka zákazníka';
        enhancedMessages[lastUserIndex].content = `${contextLabel}:\n${ragContext}\n\n${questionLabel}: ${originalQuestion}`;
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
    
    // Pridaj informáciu o použitých zdrojoch
    if (useRAG && sources.length > 0) {
      const originalContent = data.choices?.[0]?.message?.content || '';
      const sourcesText = `\n\n📚 *Zdroje: ${sources.join(', ')}*`;
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        data.choices[0].message.content = originalContent + sourcesText;
      }
    }
    
    res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
}

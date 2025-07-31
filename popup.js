// popup.js

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("summarize").addEventListener("click", () => {
      const resultDiv   = document.getElementById("result");
      const summaryType = document
        .getElementById("summary-type")
        .value
        .toLowerCase();
  
      resultDiv.innerHTML = '<div class="loader"></div>';
  
      chrome.storage.sync.get(['geminiApiKey'], ({ geminiApiKey }) => {
        if (!geminiApiKey) {
          resultDiv.textContent = "No API Key set. Click the gear icon to add one.";
          return;
        }
  
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
          chrome.tabs.sendMessage(
            tab.id,
            { type: "GET_ARTICLE_TEXT" },
            async (response) => {
              if (chrome.runtime.lastError) {
                resultDiv.textContent = "❌ " + chrome.runtime.lastError.message;
                return;
              }
  
              const text = response?.text;
              if (!text) {
                resultDiv.textContent = "Couldn't extract text from this page.";
                return;
              }
  
              try {
                const summary = await getGeminiSummary(text, summaryType, geminiApiKey);
                resultDiv.textContent = summary;
              } catch (error) {
                resultDiv.textContent = "Gemini error: " + error.message;
              }
            }
          );
        });
      });
    });
  
    document.getElementById("copy-btn").addEventListener('click', () => {
      const txt = document.getElementById("result").innerText;
      if (!txt) return;
      navigator.clipboard.writeText(txt).then(() => {
        const btn = document.getElementById("copy-btn");
        const old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = old), 2000);
      });
    });
  });
  
  async function getGeminiSummary(rawText, type, apiKey) {
    const max = 20000;
    const text = rawText.length > max ? rawText.slice(0, max) + "..." : rawText;
  
    const promptMap = {
      brief:   `Summarize in 2-3 sentences:\n\n${text}`,
      detailed:`Give a detailed summary:\n\n${text}`,
      // Modified bullets prompt to ensure each line starts with " - "
      bullets: `Summarize in 5-7 bullet points, each on its own line starting with " - ":\n\n${text}`,
    };
  
    const prompt = promptMap[type] || promptMap.brief;
  
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2 },
        }),
      }
    );
  
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error?.message || "Request failed");
    }
  
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary.";
  }
  
  

document.getElementById("copy-btn").addEventListener('click',()=>{
    const txt = document.getElementById("result").innerText;
    if (!txt) return;

    navigator.clipboard.writeText(txt).then(() => {
        const btn = document.getElementById("copy-btn");
        const old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = old), 2000);
    });
});
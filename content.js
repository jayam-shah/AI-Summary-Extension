console.log("📢 content.js loaded on", location.href);



function getArticleText() {
    const article = document.querySelector("article");
    if (article) return article.innerText;

    const paragraphs = Array.from(document.querySelectorAll("p"));
    return paragraphs.map((p) => p.innerText).join("\n");
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "GET_ARTICLE_TEXT") {
      // Try grabbing <article> text first; otherwise fall back to full body
      const articleEl = document.querySelector("article");
      const text = articleEl?.innerText.trim()
        ? articleEl.innerText
        : document.body.innerText || "";
  
      console.log("📥 GET_ARTICLE_TEXT request—sending back text:", text.slice(0, 100));
      sendResponse({ text });
      // No async work, so no need to return true
    }
  });


# 🚀 AI Summary Extension

**Summarize any web article** in your browser with one click, using Google’s Gemini API. Choose **Brief**, **Detailed**, or **Bullet Points** formats—and copy the result instantly! 📝✨

---

## 🔥 Features

- 📰 **Article Extraction**  
  Automatically grabs text from `<article>` tags (or falls back to page body).  
- 📊 **Three Summary Modes**  
  - **Brief**: 2–3 sentences  
  - **Detailed**: Full overview  
  - **Bullet Points**: 5–7 concise items  
- 📋 **Copy to Clipboard**  
  One-click “Copy” button transfers summary to your clipboard.  
- ⚙️ **Persistent API Key**  
  Store your Gemini API key in the Options page—securely synced across Chrome.  
- 🔒 **Privacy-First**  
  No user data leaves your browser except the article text you choose to summarize.

---

## 📦 Installation

### Development (Unpacked)

1. **Clone this repo**  
   ```bash
   git clone https://github.com/yourname/ai-summary-extension.git

2. **Open Chrome “Extensions”**
   Navigate to `chrome://extensions` and enable **Developer mode**.
3. **Load Unpacked**
   Click **Load unpacked** and select this project’s root folder.

### Production (Chrome Web Store)

1. Visit the public listing:
   🔗 `https://chrome.google.com/webstore/detail/your-extension-id`
2. Click **Add to Chrome** and confirm.

---

## 🖱️ Usage

1. **Click the 🔍 AI Summary** toolbar icon.
2. **Select** your summary type from the dropdown.
3. **Click “Summarize”** to fetch and display your summary.
4. **Click “Copy”** to copy it to your clipboard.

---

## ⚙️ Options Page

1. Click the **⚙️ gear icon** in the popup (or open `options.html`).
2. **Enter** your Gemini API key.
3. Click **Save Settings**—you’ll see a success message! ✓

---

## 🗂️ File Structure

```
ai-summary-extension/
├── manifest.json       # Extension manifest
├── icon.png            # Toolbar & store icon (128×128px)
├── popup.html          # Main popup UI
├── popup.js            # Popup logic & Gemini API calls
├── content.js          # Content script (text extraction)
├── options.html        # Options page UI
├── options.js          # Options page logic
└── background.js       # Background/service worker tasks
```

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push and open a Pull Request

---

## 📜 License

This project is released for educational Purpose only.
Feel free to use and distribute!

---

> Made with ❤️ by Jayam Shah

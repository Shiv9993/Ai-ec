// Securely store the API key (one-time setup)
chrome.storage.sync.set({ geminiApiKey: "AIzaSyBRE-acuSQPvBxa1-CQBdXVgQep4Hf32bk" }, () => {
  // Key is now stored securely
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "send_prompt") {
    const prompt = message.prompt;

    // Make the Gemini Pro API call (replace with actual endpoint and syntax)
    fetch("https://api.gemini.com/generate", { // Update with correct endpoint
      method: "POST",
      headers: {
        "Authorization": `Bearer ${geminiApiKey}`,
        // Add other required headers
      },
      body: JSON.stringify({
        prompt: prompt,
        // Add other required parameters
      }),
    })
    .then(response => response.json())
    .then(data => {
      const responseText = data.text; // Adjust for Gemini Pro response structure
      chrome.tabs.sendMessage(sender.tab.id, { type: "gemini_response", response: responseText });
    })
    .catch(error => {
      console.error("Error in API call:", error);
      // Handle errors appropriately
    });
  }
});

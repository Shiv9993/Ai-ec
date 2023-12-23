const chatHistory = document.getElementById("chat-history");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  const prompt = userInput.value;
  userInput.value = ""; // Clear input field

  chrome.runtime.sendMessage({ type: "send_prompt", prompt }, response => {
    chatHistory.innerHTML += `<div class="user-message">${prompt}</div>`;
    chatHistory.innerHTML += `<div class="gemini-response">${response.response}</div>`;
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
  });
});

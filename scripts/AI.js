console.log("ai_chat.js with local Mistral 7B API loaded");

// Local Ollama configuration
const CONFIG = {
  provider: "ollama",
  model: "mistral:7b-instruct",
  apiUrl: "http://localhost:11434/api/generate"
};

let conversationHistory = [];
let isFirstMessage = true;

async function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  if (isFirstMessage) {
    const emptyState = document.getElementById("emptyState");
    if (emptyState) emptyState.style.display = "none";
    isFirstMessage = false;
  }

  addMessageToChat("user", userMessage);
  messageInput.value = "";
  autoResizeTextarea(messageInput);
  setSendingState(true);
  showTyping();

  try {
    const aiResponse = await getAIResponse(userMessage);
    removeTyping();
    addMessageToChat("ai", aiResponse);
  } catch (error) {
    removeTyping();
    addMessageToChat("ai", "Error talking to local AI 😢");
    console.error("Local AI Error:", error);
  }

  setSendingState(false);
  messageInput.focus();
}

async function getAIResponse(message) {
  // Save the new user message to history
  conversationHistory.push({ role: "user", content: message });

  // Build short-term dialogue (last 3 turns max)
  const shortHistory = conversationHistory
    .slice(-6) // 3 user + 3 ai messages
    .map(entry => (entry.role === "user" ? `User: ${entry.content}` : `AI: ${entry.content}`))
    .join("\n");

  try {
    const response = await fetch(CONFIG.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CONFIG.model,
        prompt: shortHistory + `\nAI:`, // tell it to continue as AI
        stream: false,
        temperature: 0.7,
        max_length: 200
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.response?.trim() || "Hmm, I don’t know what to say.";

    // Save AI reply to history too
    conversationHistory.push({ role: "ai", content: aiResponse });

    return aiResponse;
  } catch (err) {
    console.error("Ollama API failed:", err);
    throw err;
  }
}



function addMessageToChat(sender, message) {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  messageDiv.innerHTML = `
    <div class="message-content">
      ${escapeHtml(message)}
      <div class="message-time">${currentTime}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showTyping() {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const typingDiv = document.createElement("div");
  typingDiv.id = "typing";
  typingDiv.className = "message ai";
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
      <span style="margin-left:10px;color:#666;">AI is thinking...</span>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

function setSendingState(sending) {
  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");

  if (sendBtn) {
    sendBtn.disabled = sending;
    const sendIcon = sendBtn.querySelector(".send-icon");
    if (sendIcon) sendIcon.textContent = sending ? "..." : "→";
  }
  if (messageInput) messageInput.disabled = sending;
}

function autoResizeTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  if (messageInput) {
    messageInput.addEventListener("input", e => autoResizeTextarea(e.target));
    messageInput.addEventListener("keypress", e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    messageInput.focus();
  }
  if (sendBtn) sendBtn.addEventListener("click", sendMessage);

  console.log("Local Mistral 7B chat ready! 🚀");
});

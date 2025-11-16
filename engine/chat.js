const chatQueue = [];

export function addLatestChat(chatMessage) {
  chatQueue.push(chatMessage)
}

export function getLatestChat() {
  if (chatQueue.length) {
    return chatQueue.shift();
  }
}

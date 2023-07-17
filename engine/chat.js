const chatQueue = [];

export function addLatestChat(chat) {
  chatQueue.push(chat)
}

export function getLatestChat() {
  if (chatQueue.length) {
    return chatQueue.shift();
  }
}

import React from "react";
import type { Message } from "../types";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`${styles.messageRow} ${
        isUser ? styles.user : styles.bot
      }`}
    >
      <div
        className={`${styles.bubble} ${
          isUser ? styles.userBubble : styles.botBubble
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;

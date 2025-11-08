import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { getChatReply } from "./services/openaiService";
import type { Message } from "./types";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi how can I help you？" },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (userInput: string) => {
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "Thinking..." }]);

    try {
      const reply = await getChatReply(userInput);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push({ role: "assistant", content: reply });
        return newMessages;
      });
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error: can not connect to server" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatBox}>
        <div className={styles.header}>Simple React Chatbot</div>

        <div className={styles.messages}>
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
};

export default App;

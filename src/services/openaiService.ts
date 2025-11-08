import axios from "axios";

export async function getChatReply(prompt: string): Promise<string> {
  const res = await axios.post("http://localhost:3001/chat", {
    message: prompt,
  });
  return res.data.reply;
}

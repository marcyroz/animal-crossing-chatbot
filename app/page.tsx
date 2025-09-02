"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Message } from "./_components/message";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ isUser: boolean; content: string }[]>([]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { isUser: true, content: inputValue }]);
      setInputValue("");
    }
  };

  return (
    <div className="flex mx-auto h-screen py-20 border-b-pink-300 max-w-[50%] flex-col">
      <div className="flex w-full h-full items-center justify-center">
           {messages.length > 0 ? messages.map((msg, index) => (
               <Message key={index} isUser={msg.isUser} content={msg.content} />
           )) : (
               <p>Ask me anything about animal crossing :)</p>
           )}
      </div>
      <div className="flex gap-2 w-full">
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Button className="bg-[#FF6D8D]" onClick={handleSend}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

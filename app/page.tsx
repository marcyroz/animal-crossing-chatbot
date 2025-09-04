"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Square } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Message } from "./_components/message";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen mx-auto lg:max-w-[50%]  lg:py-10">
      <div className="p-4 flex justify-between items-center">
        <span className="font-bold text-[#FF6D8D] text-2xl">
          Animal crossing chatbot
        </span>
        <Image src="/leaf.svg" alt="Leaf" width={30} height={30} />
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length > 0 ? (
          <div className="flex flex-col gap-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Message isUser={message.role === "user"}>
                  {message.parts.map((part, i) => {
                    if (part.type === "text") {
                      const html = part.text
                        .replace(
                          /\*\*(.*?)\*\*/g,
                          (_, boldText) => `<strong>${boldText}</strong>`
                        )
                        .replace(/\n/g, "<br>");

                      return (
                        <div
                          key={`${message.id}-${i}`}
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    }
                  })}
                </Message>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="gap-6 items-center flex flex-col justify-center h-full text-center">
            <Image
              src="/isabela.webp"
              alt="Isabela from Animal Crossing"
              width={100}
              height={100}
            />
            <span>Me pergunte qualquer coisa sobre Animal Crossing :)</span>
          </div>
        )}
        {messages.length >= 6 && status !== "streaming" && (
          <Button onClick={() => setMessages([])}>
            Iniciar nova conversa
          </Button>
        )}
      </div>

      <form
        className="flex gap-2 w-full p-4 bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <Input
          placeholder="Escreva uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        {status === "streaming" ? (
          <Button type="submit">
            <Square fill="#FFFFFF" />
          </Button>
        ) : (
          <Button disabled={!input || messages.length >= 6} onClick={stop}>
            <Send />
          </Button>
        )}
      </form>
    </div>
  );
}

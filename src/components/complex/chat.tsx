"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea
} from "@/components/ai-elements/prompt-input";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { DayCardTool } from "./day-card-tool";

export const Chat = () => {
  const [text, setText] = useState<string>("");
  const { messages, status, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage({ text });
      setText('');
    }
  };

  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case 'text': // we don't use any reasoning or tool calls in this example
                      return (
                        <MessageResponse key={`${message.id}-${i}`}>
                          {part.text}
                        </MessageResponse>
                      );
                    case 'tool-displayDayCard':
                      const output = part.output as { date: string, temperature: number, label: string };

                      return (
                        <DayCardTool key={`${message.id}-${i}`} date={output.date} temperature={output.temperature} label={output.label} />
                      );
                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="grid shrink-0 gap-4 pt-4">
        <div className="w-full px-4 pb-4">
          <PromptInput globalDrop multiple onSubmit={(message, event) => handleSubmit(event)}>
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(event) => setText(event.target.value)}
                value={text}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputSubmit
                disabled={!(text.trim() || status) || status === "streaming"}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

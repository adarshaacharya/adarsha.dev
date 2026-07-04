"use client";

export const ASK_BOT_EVENT = "adarsha:ask-bot";

export type AskBotEventDetail = {
  prompt: string;
};

export function askBot(prompt: string) {
  window.dispatchEvent(
    new CustomEvent<AskBotEventDetail>(ASK_BOT_EVENT, {
      detail: { prompt },
    }),
  );
}

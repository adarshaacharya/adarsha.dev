"use client";

import { motion, useReducedMotion } from "framer-motion";

type ChatMascotProps = {
  open: boolean;
};

export function ChatMascot({ open }: ChatMascotProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      className="h-[4.25rem] w-[4.25rem] overflow-visible drop-shadow-[0_5px_4px_color-mix(in_oklch,var(--foreground)_18%,transparent)]"
    >
      <motion.g
        animate={
          reduceMotion
            ? undefined
            : open
              ? { rotate: 0, y: 0 }
              : { rotate: [0, -2, 0, 2, 0], y: [0, -2, 0] }
        }
        transition={{
          duration: 3.8,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "36px 48px" }}
      >
        <path
          d="M17.5 30.5 19.7 15l12.1 8.3c1.4-.3 2.8-.4 4.2-.4 1.5 0 3 .1 4.4.4L52.3 15l2.2 15.6c3.2 3.6 5 8.2 5 13.2 0 12.1-10.5 20.7-23.5 20.7S12.5 55.9 12.5 43.8c0-5 1.8-9.7 5-13.3Z"
          fill="var(--primary)"
        />
        <path
          d="m22.5 22.4 1 7.1 5-3.2-6-3.9Zm27 0-1 7.1-5-3.2 6-3.9Z"
          fill="var(--primary-foreground)"
          opacity=".78"
        />

        <motion.g
          animate={
            reduceMotion ? undefined : { scaleY: [1, 1, 0.08, 1, 1, 1, 1] }
          }
          transition={{
            duration: 4.6,
            repeat: Infinity,
            times: [0, 0.42, 0.45, 0.48, 0.72, 0.75, 1],
          }}
          style={{ transformOrigin: "36px 41px" }}
        >
          <ellipse
            cx="28"
            cy="41"
            rx="2.25"
            ry="3"
            fill="var(--primary-foreground)"
          />
          <ellipse
            cx="44"
            cy="41"
            rx="2.25"
            ry="3"
            fill="var(--primary-foreground)"
          />
        </motion.g>

        <path
          d="M33.6 47.2c1.4 1.2 3.4 1.2 4.8 0"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M36 46.6v2.2"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M21.5 47.5h-6m7 4-5.5 2m33.5-6h6m-7 4 5.5 2"
          fill="none"
          stroke="var(--primary-foreground)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".72"
        />
      </motion.g>

      <motion.g
        initial={false}
        animate={{
          scale: open ? 1 : 0,
          rotate: open ? 0 : -45,
          opacity: open ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "57px 17px" }}
      >
        <circle cx="57" cy="17" r="11" fill="var(--primary-foreground)" />
        <path
          d="m53.5 13.5 7 7m0-7-7 7"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g
        initial={false}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "57px 17px" }}
      >
        <circle cx="57" cy="17" r="11" fill="var(--primary-foreground)" />
        <path
          d="M52.8 13.8h8.4v6.1h-4.8l-2.7 2v-2h-.9v-6.1Z"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

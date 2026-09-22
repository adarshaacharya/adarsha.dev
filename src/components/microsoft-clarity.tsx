"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { ENV } from "@/lib/env";

export const MicrosoftClarity = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!ENV.CLARITY_PROJECT_ID) return;

    Clarity.init(ENV.CLARITY_PROJECT_ID);
  }, []);

  return null;
};

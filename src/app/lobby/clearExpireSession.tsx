"use client";
import { ep_clearExpireSession } from "@/config/api_endpoint";

export const clearExpireSession: () => Promise<void> = async () => {
  await fetch(ep_clearExpireSession, {
    method: "DELETE",
  });
};

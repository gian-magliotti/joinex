"use client";
import { useState } from "react";
import { GameService } from "../services/game.service";
import { ValidationResult } from "@/app/types/types";

export const useSqlJob = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Starts the job and enters the polling loop.
   * Returns a Promise that resolves with the final result.
   */
  const executeJob = async (levelId: number, stepId: number, query: string): Promise<ValidationResult> => {
    setIsValidating(true);
    setError(null);
    try {
      const jobId = await GameService.submitValidationJob(levelId, stepId, query);
      return await poll(jobId);

    } catch (err: any) {
      const msg = err.response?.data?.message || "Communication failed";
      setError(msg);
      throw new Error(msg); 
    } finally {
      setIsValidating(false);
    }
  };

  // Internal helper for the loop
  const poll = async (jobId: string): Promise<ValidationResult> => {
    const POLL_INTERVAL = 1000;
    const MAX_RETRIES = 20;

    for (let i = 0; i < MAX_RETRIES; i++) {
      if (i > 0) await new Promise(r => setTimeout(r, POLL_INTERVAL));
      const response = await GameService.getJobResult(jobId);
      if (response !== "PROCESSING") {
        return response as ValidationResult; 
      }
    }
    throw new Error("Timeout: Server took too long to respond.");
  };

  return { executeJob, isValidating, error };
};
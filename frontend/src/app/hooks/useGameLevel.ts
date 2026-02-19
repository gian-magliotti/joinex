"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { LevelDetail } from "@/app/types/types";
import { GameService } from "../services/game.service";
import { useSqlJob } from "./useSqlJob"; 

export type FeedbackType = { type: 'success' | 'error' | 'info'; msg: string } | null;


//Reminder that i must improve this hook it ahs too many responsibilities now
export const useGameLevel = (levelId: string) => {
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [loadingLevel, setLoadingLevel] = useState(true);

  const { executeJob, isValidating, error: jobError } = useSqlJob();

  useEffect(() => {
    GameService.getLevelById(levelId)
      .then((data) => {
        setLevel(data);
        setLoadingLevel(false);
      })
      .catch(() => setLoadingLevel(false));
  }, [levelId]);

  const handleRunQuery = async () => {
    if (!level) return;
    setFeedback(null);
    setResults(null);
    
    const currentStep = level.steps[currentStepIndex];

    try {
      const result = await executeJob(level.id, currentStep.id, query);
      
      setResults(result.data);

      if (result.correct) {
        handleSuccess();
      } else {
        setFeedback({ type: 'error', msg: result.message });
      }

    } catch (e: any) {
      setFeedback({ type: 'error', msg: e.message || "Execution error" });
    }
  };

  const handleSuccess = () => {
    if (!level) return;
    const isLastStep = currentStepIndex === level.steps.length - 1;
    
    setFeedback({ type: 'success', msg: isLastStep ? "LEVEL COMPLETE!" : "Correct! Next..." });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      if (!isLastStep) {
        setCurrentStepIndex(prev => prev + 1);
        setFeedback(null);
        setQuery("");
      } else {
        confetti({ particleCount: 500, spread: 100 });
      }
    }, 2000);
  };

  return {
    level,
    currentStepIndex,
    query,
    setQuery,
    results,
    feedback,
    loading: loadingLevel,
    validating: isValidating,
    handleRunQuery,
    currentStep: level?.steps[currentStepIndex],
    schemas: level?.schemas || []
  };
};
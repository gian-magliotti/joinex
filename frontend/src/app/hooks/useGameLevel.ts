"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { LevelDetail } from "@/app/types/types";
import { GameService } from "../services/game.service";

export type FeedbackType = { type: 'success' | 'error' | 'info'; msg: string } | null;

export const useGameLevel = (levelId: string) => {
  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  // 1. Cargar Nivel
  useEffect(() => {
    GameService.getLevelById(levelId)
      .then((data) => {
        setLevel(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFeedback({ type: 'error', msg: "Error conectando con el servidor." });
        setLoading(false);
      });
  }, [levelId]);

  // 2. Ejecutar Query
  const handleRunQuery = async () => {
    if (!level) return;
    
    setValidating(true);
    setFeedback(null);
    setResults(null);

    const currentStep = level.steps[currentStepIndex];

    try {
      const data = await GameService.validateStep(level.id, currentStep.id, query);
      setResults(data.results);

      if (data.correct) {
        handleSuccess();
      } else {
        setFeedback({ type: 'error', msg: data.message });
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Error de ejecución";
      setFeedback({ type: 'error', msg: errorMsg });
    } finally {
      setValidating(false);
    }
  };

  const handleSuccess = () => {
    if (!level) return;
    const isLastStep = currentStepIndex === level.steps.length - 1;
    
    setFeedback({ type: 'success', msg: isLastStep ? "¡NIVEL COMPLETADO!" : "¡Correcto! Pasando al siguiente..." });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      if (!isLastStep) {
        setCurrentStepIndex((prev) => prev + 1);
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
    loading,
    validating,
    handleRunQuery,
    currentStep: level?.steps[currentStepIndex]
  };
};
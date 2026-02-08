import axios from "axios";
import { LevelDetail, ValidationResult } from "@/app/types/types";

const BASE_URL = "http://localhost:8080/api"; 

export const GameService = {
  getLevelById: async (id: string): Promise<LevelDetail> => {
    const response = await axios.get(`${BASE_URL}/levels/${id}`);
    return response.data;
  },

  validateStep: async (levelId: number, stepId: number, query: string): Promise<ValidationResult> => {
    const response = await axios.post<ValidationResult>(
      `${BASE_URL}/levels/${levelId}/validate`,
      null,
      {
        params: { stepId, query }
      }
    );
    return response.data;
  }
};
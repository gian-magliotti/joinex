import axios from "axios";
import { LevelDetail, ValidationResult, JobResponse } from "@/app/types/types";

const BASE_URL = "http://localhost:8080/api";

export const GameService = {
  
  getLevelById: async (id: string): Promise<LevelDetail> => {
    const response = await axios.get<LevelDetail>(`${BASE_URL}/levels/${id}`);
    return response.data;
  },

  /**
   * 1. SUBMIT: Sends the SQL to the queue.
   * Returns a Job ID immediately.
   */
  submitValidationJob: async (levelId: number, stepId: number, query: string): Promise<string> => {
    const response = await axios.post<JobResponse>(
      `${BASE_URL}/levels/${levelId}/validate`,
      null,
      {
        params: { stepId, query }
      }
    );
    return response.data.jobId;
  },

  /**
   * 2. POLL: Checks if the worker has finished.
   * Returns either "PROCESSING" (string) or the ValidationResult (object).
   */
  getJobResult: async (jobId: string): Promise<ValidationResult | "PROCESSING"> => {
    const response = await axios.get<ValidationResult | "PROCESSING">(`${BASE_URL}/jobs/${jobId}`);
    return response.data;
  }
};
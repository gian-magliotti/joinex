import axios from "axios";
import { Level } from "../types/types";

const API_BASE_URL = "http://localhost:8080/api";

export const LevelService = {
  getLevels:async (): Promise<Level[]> => {
    try {
      const { data } = await axios.get<Level[]>(`${API_BASE_URL}/levels`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error al conectar con Joinex");
      }
      throw new Error("Ocurrió un error inesperado");
    }
  },
}
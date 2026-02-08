import { useState, useEffect } from "react";
import { Level } from "../types/types";
import { LevelService } from "../services/level.service";

export const useLevels = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LevelService.getLevels()
      .then(setLevels)
      .catch((err) => {
        console.error(err);
        setError("Error: No puedo conectar con el servidor de Joinex.");
      })
      .finally(() => setLoading(false));
  }, []);

  return { levels, error, loading };
};
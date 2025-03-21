import { useMemo } from "react";

export const useTranslator = () => {
  const statusMap: Record<string, string> = useMemo(() => ({
    "Alive": "Vivo",
    "Dead": "Morto",
    "unknown": "Desconhecido",
  }), []);

  const translate = (key: string) => statusMap[key] || key;

  return { translate };
};

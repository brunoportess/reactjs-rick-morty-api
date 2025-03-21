import { useMemo } from "react";

export const useTranslator = () => {
  const statusMap: Record<string, string> = useMemo(() => ({
    "Alive": "Vivo",
    "Dead": "Morto",
    "unknown": "Desconhecido",
    "Male": "Masculino",
    "Female": "Feminino",
  }), []);

  const translate = (key: string) => statusMap[key] || key;

  return { translate };
};

export default useTranslator
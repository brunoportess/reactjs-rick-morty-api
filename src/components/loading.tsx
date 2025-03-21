import React from "react";
import { useLoading } from "../context/LoadingContext";
import { Spinner } from "react-bootstrap";


const Loading: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null; // Se não estiver carregando, não renderiza nada

  return (
    <div className="loading-overlay">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    </div>
  );
};

export default Loading;

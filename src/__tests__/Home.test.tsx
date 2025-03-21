import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import  Home  from "../pages/home";
import { LoadingProvider } from "../context/LoadingContext";
import axios from "axios";


// Mock do axios para simular chamadas à API
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


// Dados fictícios para simular a API
const mockCharactersResponse = {
  data: {
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        location: { name: "Earth" },
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/2"],
        location: { name: "Earth" },
      },
    ],
    info: {
      count: 2,
      next: null,
      prev: null,
    },
  },
};

// Função para renderizar o componente dentro do contexto adequado
const renderHome = () => {
  return render(
    <BrowserRouter>
      <LoadingProvider>
        
          <Home />
        
      </LoadingProvider>
    </BrowserRouter>
  );
};

describe("Página Home", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue(mockCharactersResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar o título corretamente", async () => {
    renderHome();
    expect(screen.getByText("Personagens Rick & Morty")).toBeInTheDocument();
  });

  test("deve carregar e exibir personagens da API", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });
  });

  test("deve permitir busca por nome", async () => {
    renderHome();

    const searchInput = screen.getByPlaceholderText("Buscar por nome");
    fireEvent.change(searchInput, { target: { value: "Rick" } });

    const searchButton = screen.getByText("Buscar");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/?name=Rick"
      );
    });
  });

  test("deve permitir filtragem por status", async () => {
    renderHome();

    const statusSelect = screen.getByRole("combobox");
    fireEvent.change(statusSelect, { target: { value: "alive" } });

    const searchButton = screen.getByText("Buscar");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://rickandmortyapi.com/api/character/?status=alive"
      );
    });
  });
});

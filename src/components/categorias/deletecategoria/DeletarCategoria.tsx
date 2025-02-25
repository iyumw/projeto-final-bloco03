import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { listar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error);
      if (error.toString().includes("403")) {
        ToastAlerta("Sua sessão expirou. Faça login novamente.", "info");
        navigate("/");
      } else {
        ToastAlerta("Erro ao carregar a categoria.", "erro");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`);
      ToastAlerta("Categoria deletada com sucesso!", "sucesso");
      navigate("/categorias");
    } catch (error: any) {
      console.error("Erro ao deletar categoria:", error);
      if (error.toString().includes("403")) {
        ToastAlerta("Sua sessão expirou. Faça login novamente.", "info");
        navigate("/");
      } else {
        ToastAlerta("Erro ao deletar a categoria.", "erro");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/categorias");
  }

  if (!categoria.nome) {
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--color-purple-light)]">
        <RotatingLines
          strokeColor="var(--color-green-medium)"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-purple-light)] p-4">
      <div className="container w-full max-w-2xl mx-auto p-6 bg-[var(--color-white)] rounded-lg shadow-lg flex flex-col items-center font-heading">
        <h1 className="text-4xl text-center my-6 text-[var(--color-purple-dark)] font-bold">
          Deletar Categoria
        </h1>

        <p className="text-center text-[var(--color-gray-neutral)] mb-6">
          Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div className="border border-[var(--color-purple-medium)] rounded-lg overflow-hidden bg-[var(--color-white)] w-full">
          <header className="py-3 px-6 bg-[var(--color-purple-medium)] text-[var(--color-white)] font-bold text-2xl text-center">
            Categoria
          </header>
          <div className="p-6 flex flex-col items-center">
            <p className="text-[var(--color-gray-neutral)]">
              <span className="font-semibold">Descrição:</span> {categoria.nome}
            </p>
            <p className="text-[var(--color-gray-neutral)]">
              <span className="font-semibold">ID:</span> {categoria.id}
            </p>
          </div>
          <div className="flex">
            <button
              className="flex-1 bg-[var(--color-purple-medium)] hover:bg-[var(--color-purple-dark)] text-[var(--color-white)] font-bold py-3 transition-colors"
              onClick={retornar}
            >
              Não, voltar
            </button>
            <button
              className="flex-1 bg-danger hover:bg-danger-light text-[var(--color-white)] font-bold py-3 flex items-center justify-center transition-colors"
              onClick={deletarCategoria}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Sim, deletar</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
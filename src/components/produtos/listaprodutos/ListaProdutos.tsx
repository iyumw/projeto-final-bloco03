import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { BeatLoader } from "react-spinners";

function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar o carregamento

  // Função para buscar produtos na API
  async function buscarProdutos() {
    setIsLoading(true); // Ativa o loader
    try {
      await listar("/produtos", setProdutos);
    } catch (error: any) {
      // Se houver erro 403, redireciona para a página inicial
      if (error.toString().includes("403")) {
        navigate("/");
      }
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false); // Desativa o loader, independentemente do resultado
    }
  }

  // Busca os produtos ao montar o componente
  useEffect(() => {
    buscarProdutos();
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <>
      {/* Exibe o loader enquanto os produtos estão sendo carregados */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="var(--color-green-medium)" />
        </div>
      ) : (
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col mx-2">
            {/* Exibe uma mensagem se nenhum produto for encontrado */}
            {produtos.length === 0 && !isLoading && (
              <div className="flex justify-center items-center h-64">
                <p className="text-2xl text-[var(--color-gray-neutral)] font-semibold">
                  Nenhum produto encontrado.
                </p>
              </div>
            )}

            {/* Renderiza os produtos em formato de cards */}
            {produtos.length > 0 && (
              <div
                className="container mx-auto my-4 
                          grid grid-cols-1 sm:grid-cols-2 
                          md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {produtos.map((produto) => (
                  <CardProdutos key={produto.id} produto={produto} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListaProdutos;
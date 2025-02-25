import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-[var(--color-soft-white)] w-full max-w-xs mx-auto transform hover:-translate-y-1">
      <div className="flex justify-end p-2">
        
        {/* Botões para editar ou excluir o produto */}
        <Link
          to={`/editarproduto/${produto.id}`}
          className="text-white bg-green-medium hover:bg-green-lighter
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out mr-2"
        >
          <Pencil size={20} />
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-white bg-danger hover:bg-danger-light
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
        >
          <Trash size={20} />
        </Link>
      </div>

      {/* Informações do produto */}
      <div className="flex flex-col items-center p-4">
        <img
          src={produto?.foto}
          className="h-48 w-48 object-cover mb-4 rounded-lg"
          alt={produto?.nome}
        />
        <p className="text-xl font-bold text-purple-dark mb-2 text-center">
          {produto.nome}
        </p>
        <p className="text-lg text-dark-gray mb-2">R${produto.preco}</p>
        <p className="font-semibold">Categoria:</p> {produto.categoria?.nome}
      </div>

      {/* Botão para ir para a tela de compra do produto */}
      <Link
        to={`/comprarProduto/${produto.id}`}
        className="text-white bg-purple-medium hover:bg-purple-light w-full
                    flex items-center justify-center py-3 transition duration-300 ease-in-out"
      >
        <button>Comprar</button>
      </Link>
    </div>
  );
}

export default CardProdutos;

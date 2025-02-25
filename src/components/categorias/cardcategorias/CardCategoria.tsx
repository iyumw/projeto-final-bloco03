import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { Pencil, Trash } from "@phosphor-icons/react";

interface CardTemasProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardTemasProps) {
    return (
      <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="flex w-full bg-purple-dark py-2 px-4 items-center gap-4">
          <header className="py-2 px-6 font-heading text-white font-bold text-2xl w-full">
            Categoria
          </header>
  
          <div className="flex justify-end gap-1">
            <Link
              to={`/editarcategoria/${categoria.id}`}
              className="text-white bg-green-medium hover:bg-green-lighter flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
            >
              <Pencil size={20} />
            </Link>
            <Link
              to={`/deletarcategoria/${categoria.id}`}
              className="text-white bg-danger hover:bg-danger-light flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
            >
              <Trash size={20} />
            </Link>
          </div>
        </div>
  
        <div className="p-6 flex flex-col text-2xl bg-white">
          <p className="text-[var(--color-gray-neutral)]">
            <span className="font-semibold">Descrição:</span> {categoria.nome}
          </p>
          <p className="text-[var(--color-gray-neutral)]">
            <span className="font-semibold">ID:</span> {categoria.id}
          </p>
        </div>
      </div>
    );
  }
  

export default CardCategorias;

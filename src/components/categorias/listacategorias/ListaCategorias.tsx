import { BeatLoader } from "react-spinners";
import Categoria from "../../../models/Categoria";
import { useEffect, useState } from "react";
import { listar } from "../../../services/Service";
import CardCategoria from "../cardcategorias/CardCategoria";

function ListaCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
  
    async function buscarCategorias() {
      try {
        await listar("/categorias", setCategorias);
      } catch (error: any) {
        console.error("Erro ao carregar categorias", error);
      }
    }
  
    useEffect(() => {
      buscarCategorias();
    }, []);
  
    return (
      <>
        {categorias.length === 0 && (
            <div className="flex justify-center items-center h-screen">
              <BeatLoader color="var(--color-green-medium)" />
            </div>
        )}
        <div className="flex justify-center w-full my-4 pb-8">
          <div className="container flex flex-col">
            <h1 className="text-4xl font-medium text-center my-8 text-purple-dark">
              Lista de Categorias
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
              {categorias.map((categoria: Categoria) => (
                <CardCategoria key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default ListaCategorias;

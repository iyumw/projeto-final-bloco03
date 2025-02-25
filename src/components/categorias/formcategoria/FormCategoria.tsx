import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { atualizar, listar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function buscarPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria);
    } catch (error) {
      ToastAlerta("Erro ao buscar a categoria.", "erro");
      console.error(error);
    }
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await atualizar("/categorias", categoria, setCategoria);
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar("/categorias", categoria, setCategoria);
        ToastAlerta("Categoria cadastrada com sucesso!", "sucesso");
      }
    } catch (error) {
      ToastAlerta("Erro ao salvar a categoria.", "erro");
      console.error(error);
    } finally {
      setIsLoading(false);
      retornar();
    }
  }

  function retornar() {
    navigate("/categorias");
  }

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-purple-light)] p-4">
      <div className="container flex flex-col mx-auto items-center bg-[var(--color-white)] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl text-center my-8 text-[var(--color-purple-dark)] font-bold font-heading">
          {id ? "Editar Categoria" : "Cadastrar Categoria"}
        </h1>

        <form className="flex flex-col w-full gap-6" onSubmit={gerarNovaCategoria}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-[var(--color-purple-dark)] font-semibold">
              Descrição da Categoria
            </label>
            <input
              type="text"
              placeholder="Descreva aqui sua categoria"
              name="nome"
              className="border-2 border-[var(--color-purple-medium)] rounded p-2 focus:outline-none focus:border-[var(--color-purple-dark)] bg-[var(--color-white)] text-[var(--color-gray-neutral)]"
              value={categoria.nome}
              onChange={atualizarEstado}
            />
          </div>
          <button
            className="rounded disabled:bg-[var(--color-green-light)] bg-[var(--color-green-medium)] hover:bg-[var(--color-green-light)] text-[var(--color-white)] font-bold w-full py-3 flex justify-center transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
            ) : (
              <span>{id ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;
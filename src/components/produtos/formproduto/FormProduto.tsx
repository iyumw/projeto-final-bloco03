import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { atualizar, listar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: "" });
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  // Busca um produto pelo ID caso esteja editando
  async function buscarProdutoPorId(id: string) {
    try {
      await listar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  // Busca uma categoria pelo ID
  async function buscarCategoriaPorId(id: string) {
    try {
      await listar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  // Busca todas as categorias e as ordena alfabeticamente
  async function buscarCategorias() {
    try {
      await listar("/categorias", setCategorias);
      // Ordena as categorias em ordem alfabética
      setCategorias((prevCategorias) =>
        [...prevCategorias].sort((a, b) => a.nome.localeCompare(b.nome))
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  // Busca todas as categorias e as ordena alfabeticamente
  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  // Atualiza o produto sempre que a categoria mudar
  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  // Atualiza os campos do produto conforme o usuário digita
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, value, name } = e.target;
    let valor: string | number = value;

    if (
      ["number", "range"].includes(type) ||
      (!isNaN(Number(value)) && value !== "")
    ) {
      valor = parseFloat(Number(value).toFixed(2));
    }

    setProduto({
      ...produto,
      [name]: valor,
      categoria: categoria,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const novoProduto = {
      ...produto,
      categoria: categoria,
    };

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto);
        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } else {
        await cadastrar(`/produtos`, produto, setProduto);
        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      }
    } catch (error: any) {
      console.error("Erro completo:", error);
      if (error.response) {
        alert(`Erro: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        alert("Erro: Nenhuma resposta recebida do servidor.");
      } else {
        alert("Erro ao processar a requisição.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = categoria.nome === "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-light p-4">
      <div className="container flex flex-col mx-auto items-center bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl text-center my-8 text-purple-dark font-heading font-bold">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <form
          className="flex flex-col w-full gap-6"
          onSubmit={gerarNovoProduto}
        >
          {/* Campos do formulário para nome, foto, preço e categoria */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="font-semibold"
            >
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="foto"
              className="text-[var(--color-soft-white)] font-semibold"
            >
              Foto do Produto
            </label>
            <textarea
              placeholder="Link da Foto"
              name="foto"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] h-20 resize-none bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.foto}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setProduto({ ...produto, foto: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="preco"
              className="text-[var(--color-soft-white)] font-semibold"
            >
              Preço do Produto
            </label>
            <input
              type="number"
              step=".01"
              placeholder="Preço"
              name="preco"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[var(--color-soft-white)] font-semibold">
              Categoria do Produto
            </p>
            <select
              name="categoria"
              id="categoria"
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione uma Categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
          {/* Botão de envio, desabilitado enquanto a categoria não é carregada */}
          <button
            type="submit"
            className="rounded disabled:bg-[var(--color-green-light)] bg-[var(--color-green-medium)] hover:bg-[var(--color-green-light)] text-[var(--color-white)] font-bold w-full py-3 flex justify-center transition-colors"
            disabled={carregandoCategoria}
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
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;

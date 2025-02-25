import { MagnifyingGlass, ShoppingCart, User } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [categoriaDropdown, setCategoriaDropdown] = useState(false);
  const [produtoDropdown, setProdutoDropdown] = useState(false);

  // Referências para os dropdowns
  const categoriaDropdownRef = useRef<HTMLDivElement>(null);
  const produtoDropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriaDropdownRef.current &&
        !categoriaDropdownRef.current.contains(event.target as Node)
      ) {
        setCategoriaDropdown(false);
      }
      if (
        produtoDropdownRef.current &&
        !produtoDropdownRef.current.contains(event.target as Node)
      ) {
        setProdutoDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[var(--color-purple-dark)] p-4 px-8 shadow-lg text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <Link
          to="/home"
          className="text-3xl font-bold transition duration-300 ease-in-out hover:text-[var(--color-purple-light)] hover:scale-105"
        >
          <img
            className="w-32"
            src="https://ik.imagekit.io/iyume/produtos_farmacia/assets/logo.png"
            alt="Logo da Farmácia"
          />
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex items-center flex-grow max-w-[600px] mx-4">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full px-4 py-2 rounded-l-lg bg-[var(--color-purple-medium)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-purple-light)]"
          />
          <button className="px-4 py-2 bg-[var(--color-green-medium)] hover:bg-[var(--color-green-light)] text-white rounded-r-lg transition duration-300 ease-in-out">
            <MagnifyingGlass size={24} />
          </button>
        </div>

        {/* Links da Navbar */}
        <div className="flex gap-4 items-center">
          <div className="flex space-x-6 font-heading">
            {/* Dropdown Produtos */}
            <div className="relative z-10" ref={produtoDropdownRef}>
              <button
                onClick={() => {
                  setProdutoDropdown(!produtoDropdown);
                  setCategoriaDropdown(false); // Fecha os outros dropdowns
                }}
                className="hover:text-[var(--color-purple-light)]  transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1 font-heading"
              >
                Produtos
              </button>
              {produtoDropdown && (
                <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                  <Link
                    to="/produtos"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProdutoDropdown(false)}
                  >
                    Produtos
                  </Link>
                  <Link
                    to="/cadastrarproduto"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProdutoDropdown(false)}
                  >
                    Cadastrar Produto
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Categorias */}
            <div className="relative z-10" ref={categoriaDropdownRef}>
              <button
                onClick={() => {
                  setCategoriaDropdown(!categoriaDropdown);
                  setProdutoDropdown(false); // Fecha os outros dropdowns
                }}
                className="hover:text-vibrant-purple transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
              >
                Categorias
                <i className="bi bi-caret-down-fill text-sm"></i>
              </button>
              {categoriaDropdown && (
                <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                  <Link
                    to="/categorias"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setCategoriaDropdown(false)}
                  >
                    Categorias
                  </Link>
                  <Link
                    to="/cadastrarcategoria"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setCategoriaDropdown(false)}
                  >
                    Cadastrar Categoria
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/perfil"
              className="hover:text-[var(--color-purple-light)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <User size={29} />
            </Link>
            <Link
              to="/carrinho"
              className="hover:text-[var(--color-purple-light)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <ShoppingCart size={29} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

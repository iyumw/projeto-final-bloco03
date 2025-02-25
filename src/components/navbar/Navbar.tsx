import { MagnifyingGlass, ShoppingCart, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-dark p-4 px-8 shadow-lg text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <Link
          to="/home"
          className="text-3xl font-bold transition duration-300 ease-in-out hover:text-pink-50 hover:scale-105"
        >
          <img
            className="w-32" // Reduzi o tamanho da logo para evitar sobrecarregar o layout
            src="https://ik.imagekit.io/iyume/produtos_farmacia/assets/logo.png"
            alt="Logo da Farmácia"
          />
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex items-center flex-grow max-w-[600px] mx-4">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full px-4 py-2 rounded-l-lg bg-purple-medium text-white focus:outline-none focus:ring-2 focus:ring-purple-light"
          />
          <button className="px-4 py-2 bg-green-medium hover:bg-green-light text-white rounded-r-lg transition duration-300 ease-in-out">
            <MagnifyingGlass size={24} />
          </button>
        </div>

        {/* Links da Navbar */}
        <div className="flex gap-4 items-center">
          <div className="flex space-x-6 font-heading">
            <Link
              to="/categorias"
              className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1"
            >
              Categorias
            </Link>
            <Link
              to="/cadastrarcategoria"
              className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1"
            >
              Cadastrar Categorias
            </Link>
            <Link
              to="/perfil"
              className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <User size={29} />
            </Link>
            <Link
              to="/carrinho"
              className="hover:text-purple-light transition duration-300 ease-in-out hover:-translate-y-1"
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
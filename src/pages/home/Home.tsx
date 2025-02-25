function Home() {
  return (
    <div className="flex-1 flex justify-center bg-purple-light">
      <div className="container grid grid-cols-2">
        {/* Coluna esquerda: Texto e botões */}
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <h2 className="text-4xl font-bold text-gray-800 font-heading">
            Seja Bem Vindo!
          </h2>
          <p className="text-x font-sans">
            Aqui você encontra Medicamentos e Cosméticos!
          </p>
          <div className="flex justify-around gap-4">
            <button className="px-6 py-2 bg-green-medium text-white rounded-md hover:bg-green-light hover:text-purple-dark duration-300 transition-colors ease-in-out cursor-pointer font-sans">
              Cadastrar Categoria
            </button>
            {/* <ModalCategoria /> */}
          </div>
        </div>

        {/* Coluna direita: Imagem */}
        <div className="flex justify-center">
          <img
            src="https://ik.imagekit.io/iyume/produtos_farmacia/assets/home.png"
            alt="Imagem da Página Home"
            className="w-2/3"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

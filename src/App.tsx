import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import ListaCategorias from "./components/categorias/listacategorias/ListaCategorias";
import DeletarCategoria from "./components/categorias/deletecategoria/DeletarCategoria";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="scroll-smooth antialiased flex flex-col">
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route
                path="/deletarcategoria/:id"
                element={<DeletarCategoria />}
              />
              <Route path="/categorias" element={<ListaCategorias />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

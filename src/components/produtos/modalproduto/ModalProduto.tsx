import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalProduto.css"
import FormProduto from "../formproduto/FormProduto";

function ModalProduto() {
  return (
    <>
      <Popup
        trigger={
          <button className="rounded bg-green-medium text-white border-green-medium border-2 py-2 px-4 cursor-pointer hover:bg-green-lighter hover:border-green-lighter hover:text-gray-800 transition-colors">
            Novo Produto
          </button>
        }
        modal
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;

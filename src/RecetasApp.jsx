import { SeleccionIngredientes } from "./componentes/SeleccionIngredientes"
import { Navbar } from "./componentes/Navbar"
import { RecetasAppRouter } from "./router/RecetasAppRouter"

export const RecetasApp = () => {

  return (
    <>
      <Navbar />
      {/* <div className="divima">
      <img src="images/fondo.jpg" className="imge"/>
      </div> */}
      <RecetasAppRouter />



    </>
  )
}

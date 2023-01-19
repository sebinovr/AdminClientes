import { useLoaderData } from "react-router-dom"
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";

//Loader - siempre debe haber un return
export function loader() {
  const clientes = obtenerClientes()
  return clientes
}


function Index() {
  
  //Para acceder a informacion que retorna funcion 'loader'
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
    
      {clientes.length ? (
        <table className="bg-white shadow mt-5 table-auto w-full">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          
          <tbody>
              {clientes.map (cliente => (
                <Cliente
                  cliente = {cliente}
                  key = {cliente.id}
                />
              ))}
            </tbody>

        </table>

      ):(

        <p className="text-center mt-16"></p>

      )}

    </>
  )
}

export default Index
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario';
import Error from '../components/Error';
import { agregarClientes } from '../data/clientes';

export async function action({request}) {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')
    
    //Validación de llenado de campos
    const errores = []
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son obligatorios')
    }

    //Expresion regular para validacion de Email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
        errores.push('Email no valido')
    }
    

    //Retornar errores
    if(Object.keys(errores).length){
        return errores
    }

    //Agregar clientes y redirecciona a pagina principal
    await agregarClientes(datos)
    return redirect('/')
}

function NuevoCliente() {
    //Se pasan errores que se retornan en funcion 'action'
    const errores = useActionData()

    //Para redireccionar desde boton 'volver'
    const navigate = useNavigate();


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-20">Llena todos los campos para registrar un nuevo cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={ () => navigate('/')}
                >
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-30 mt-20'>

                {/* Se lee como... si hay algo en 'errores' entonces ...  */}
                {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}

                <Form
                    method='post'
                >
                    <Formulario />

                    <input 
                        type="submit"
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value="Registrar Cliente"
                    />
                </Form>
            </div>
        </>
    )
}

export default NuevoCliente
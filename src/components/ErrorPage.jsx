//Hooke

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error.message)

    return (
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-28 text-blue-900">AdminClientes</h1>
            <p className="text-center">Hubo un error</p>      
            <p className="text-center">{error.message}</p>
        </div>
    )
}
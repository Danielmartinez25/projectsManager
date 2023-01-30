import { Link } from "react-router-dom"

export const Register = () => {

  return (

   <>
    <h1 className='text-sky-600 font-black text-3xl capitalize'>Creá tu cuenta</h1>

    <form 
      action="" 
      className='my-10 p-8 bg-white rounded-lg border shadow-lg'
    >

        <div className="my-5">
          <label htmlFor="name" className="text-gray-400 block font-bold uppercase">Nombre</label>
          <input 
            id="name"
            type="text"
            placeholder="Ingresá tu nombre"
            className="w-full mt-3 p-3 border rounded"
            />
        </div>
        <div className="my-5">
          <label htmlFor="email" className="text-gray-400 block font-bold uppercase">Correo electrónico</label>
          <input 
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded"
            />
        </div>
        <div className="my-5">
          <label htmlFor="password" className="text-gray-400 block font-bold uppercase">Contraseña</label>
          <input 
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded"
            />
        </div>
        <div className="my-5">
          <label htmlFor="password2" className="text-gray-400 block font-bold uppercase">Confirma tu contraseña</label>
          <input 
            id="password2"
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full mt-3 p-3 border rounded"
            />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
        >
          Crear cuenta
        </button>
    </form>
    <nav className='md:flex md:justify-between'>
      <Link
        to={'/'}
        className=" text-sky-700 block text-center my-3 text-sm uppercase "
      >
        ¿Estás registrado? Iniciá sesión
      </Link>
      <Link
        to={'/forget-password'}
        className=" text-sky-700 block text-center my-3 text-sm uppercase "
      >
        Olvidé mi password
      </Link>
      
    </nav>
  </>
  )
}

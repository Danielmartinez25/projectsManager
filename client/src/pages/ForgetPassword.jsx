import { Link } from "react-router-dom";

export const ForgetPassword = () => {

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Recupera tu acceso 
      </h1>

      <form
        action=""
        className="my-10 p-8 bg-white rounded-lg border shadow-lg"
        noValidate
      >
        <div className="my-5">
          <label htmlFor="email" className="text-gray-400 block font-bold uppercase">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Ingresá tu email"
            className="w-full mt-3 p-3 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
        >
          Recuperar contraseña
        </button>
      </form>
      <nav className="md:flex md:justify-between">
        <Link
          to={"/register"}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          ¿No tenés una cuenta? Registrate
        </Link>
        <Link
          to={"/"}
          className=" text-sky-700 block text-center my-3 text-sm uppercase "
        >
          ¿Estás registrado? Iniciá sesión
        </Link>
      </nav>
    </>
  );
};

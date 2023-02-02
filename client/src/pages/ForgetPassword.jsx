import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const ForgetPassword = () => {

  const [alert, setAlert] = useState({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email){
      handleShowAlert('El email es requerido')
      return null
    };

    try {

      setSending(true)
      const {data} = await clientAxios.post('/auth/send-token',{
        email
      });
      setSending(false)

      Swal.fire({
        icon: 'info',
        title: 'Revisá tu casila de correo!',
        text: data.msg,
        confirmButtonText : "Entendido",
        allowOutsideClick : false
      });
      
      setEmail("");

      
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response?.data.msg)
      setEmail("");
    }
  }

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Recupera tu acceso 
      </h1>
        {
          alert.msg && <Alert {...alert} />
        }
      <form
        onSubmit={handleSubmit}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 disabled:bg-sky-300 transition-colors mb-4"
          disabled={sending}
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

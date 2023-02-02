import { useEffect, useState } from "react";
import {useParams, useNavigate, Link} from 'react-router-dom';
import Swal from "sweetalert2";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";

export const RecoverPassword = () => {

  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);

  const {token} = useParams();
  const navigate = useNavigate();

  const handleShowAlert = (msg) => {
    setAlert({
      msg
    });

    setTimeout(() => {
      setAlert({});
    }, 3000);

  };

  useEffect(() => {

    const checkToken = async () => {
      try {

        const {data} = await clientAxios.get(`/auth/reset-password?token=${token}`);
        console.log(data.msg)
        setTokenChecked(true)
        
      } catch (error) {
        console.error(error)
        handleShowAlert(error.response?.data.msg)
      }
    }

    checkToken()
  
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(!password) {
      handleShowAlert('El password es requerido')
      return null
    }

    try {
      const {data} = await clientAxios.post(`/auth/reset-password?token=${token}`,{
        password
      });
  
      Swal.fire({
        icon: 'info',
        title: 'Contraseña reseteada!',
        text: data.msg,
        confirmButtonText : "Iniciá sesión",
        allowOutsideClick : false
      }).then(result => {
        if(result.isConfirmed){
          setPassword("");
          navigate('/')
        }
      }) 
    } catch (error) {
      console.error(error)
      handleShowAlert(error.response?.data.msg)
      setPassword("");

    }

  }
  
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Reestablecé tu contraseña
      </h1>
    {
      alert.msg && <Alert {...alert} />
    }
    {
      tokenChecked ?
      (
        <form
        onSubmit={handleSubmit}
        className="my-10 p-8 bg-white rounded-lg border shadow-lg"
        noValidate
      >
        <div className="my-5">
          <label
            htmlFor="password"
            className="text-gray-400 block font-bold uppercase"
          >
            Nueva contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribí tu nueva contraseña"
            className="w-full mt-3 p-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
        >
          Resetear contraseña
        </button>
      </form>
      ) :
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
    }
   
    </>
  );
};

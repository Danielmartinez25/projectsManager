export const RecoverPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-3xl capitalize">
        Reestablecé tu contraseña
      </h1>

      <form
        action=""
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
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 w-full py-3 text-white uppercase font-sans rounded  hover:bg-sky-800 transition-colors mb-4"
        >
          Guardar tu contraseña
        </button>
      </form>
    </>
  );
};

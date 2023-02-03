import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { auth, loading } = useAuth();
console.log(loading);
  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {auth._id ? (
        <main className="container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

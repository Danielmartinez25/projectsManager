import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = () => {
  return (
    <div className='border-b p-3 flex justify-between'>
        <p>
           Nombre del proyecto
           <span
           className='text-sm text-gray-500 uppercase'
           >
            {" | CLIENTE" }
           </span>
        </p>
        <Link
            to={'/projects/1'}
            className="uppercase text-sm text-gray-400 hover:text-gray-800 font-bold"
        >
            Ver proyecto
        </Link>
        
    </div>
  );
};
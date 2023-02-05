import React from 'react'
import { ProjectPreview } from '../components/ProjectPreview'

export const Projects = () => {
  const projects = [1,2]
  return (
    <>
    <h1
     className='text-4xl font-black'
    >
      Proyectos
    </h1>
    <div
     className='bg-white p-5 shadow mt-10 rounded-md'
    >
      {
        projects.length
        ?
        projects.map(project => <ProjectPreview key={project}/>)
        :
        <p>No hay proyectos agregados</p>
      
      }
    </div>
    </>
  )
}

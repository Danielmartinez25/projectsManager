import React, { createContext, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({});
  const [alertModal, setAlertModal] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  const showAlert = (msg, time = true) => {
    setAlert({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  const showAlertModal = (msg, time = true) => {
    setAlertModal({
      msg,
    });

    if (time) {
      setTimeout(() => {
        setAlertModal({});
      }, 3000);
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const getProjects = async () => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get("/projects", config);
      //console.log(data)
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const getProject = async (id) => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.get(`/projects/${id}`, config);
      //console.log(data)
      setProject(data.project);
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  const storeProject = async (project) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clientAxios.post(`/projects`, project, config);
      setProjects([...projects, data.project]);

      Toast.fire({
        icon: "success",
        title: data.msg,
      });

      navigate("projects");
    } catch (error) {
      console.error(error);
      showAlert(
        error.response ? error.response.data.msg : "Upss, hubo un error",
        false
      );
    }
  };

  const storeTask = async (task) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      task.project = project._id;
      const { data } = await clientAxios.post("/tasks", task, config);
      project.tasks = [...project.tasks, data.task];
      setProject(project);

      setShowModal(false)

      Toast.fire({
        icon: "success",
        title: data.msg,
      });
      setAlert({});


    } catch (error) {
        console.log(error);
        showAlertModal(error.response ? error.response.data.msg : "Upss, hubo un error", false);
      }

  };

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        alertModal,
        showAlertModal,
        showModal,
        handleShowModal,
        projects,
        getProjects,
        project,
        getProject,
        storeProject,
        storeTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;

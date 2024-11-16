import axios from "axios";
import { BASE_URL } from "../../config/appConfig";
import { IProject } from "../../interface/interfaces";
import { sweetAlertError } from "../sweet-alert/sweetAlert";

export const getProjects = async (
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>, // For setting project data
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  statusFilter: string = ""
  // For setting loading state
) => {
  setLoading(true); // Start loading when the API call begins

  try {
    const response = await axios.get(`${BASE_URL}/projects`, {
      params: {
        status: statusFilter, // Pass the filter as a query parameter
      },
    });

    setProjects(response.data.data); // Set the received data in the state
  } catch (error: any) {
    sweetAlertError(error.message);
  } finally {
    setLoading(false); // Stop loading after API call completes
  }
};

export const createProject = async (
  projectData: IProject,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);

  try {
    // Make POST request to create a new project
    const response = await axios.post(`${BASE_URL}/projects`, projectData);
  } catch (error: any) {
    sweetAlertError(error.message);
  } finally {
    setLoading(false); // Stop loading after the request is done
  }
};

export const handleFormSubmit = async (
  values: IProject,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  projectToEdit: IProject | null,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
) => {
  setLoading(true);
  try {
    if (projectToEdit) {
      // Edit existing project
      await axios.put(`${BASE_URL}/projects/${projectToEdit.id}`, values);
    } else {
      // Create new project
      await axios.post(`${BASE_URL}/projects`, values);
    }

    // Refetch projects after adding/editing
    await getProjects(setProjects, setLoading);
    setIsModalOpen(false); // Close the modal after submission
  } catch (error: any) {
    sweetAlertError(error.message);
  } finally {
    setLoading(false);
  }
};

// Function to handle project edit
export const handleEdit = async (
  projectId: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setProjectToEdit: React.Dispatch<React.SetStateAction<IProject | null>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await axios.get(`${BASE_URL}/projects/${projectId}`);
    setProjectToEdit(response.data.data);
    setIsModalOpen(true); // Open the modal with project data for editing
  } catch (error: any) {
    sweetAlertError(error.message);
  } finally {
    setLoading(false);
  }
};

export const handleDelete = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  projectId: number,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    if (projectId) {
      // Edit existing project
      await axios.delete(`${BASE_URL}/projects/${projectId}`);
    }

    setIsModalOpen(false); // Close the modal after submission
  } catch (error: any) {
    sweetAlertError(error.message);
  } finally {
    setLoading(false);
  }
};

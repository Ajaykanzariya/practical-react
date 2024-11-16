// src/components/Project.tsx

import React, { useState, useEffect } from "react";
import {
  createProject,
  getProjects,
  handleDelete,
  handleEdit,
  handleFormSubmit,
} from "./projectController";
import { IProject } from "../../interface/interfaces";
import axios from "axios";
import ProjectForm from "../project-form/projectForm";
import Modal from "../model/model";
import ProjectCard from "../card/card";

const Project: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<IProject | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Fetch projects when the component mounts
 useEffect(() => {
    getProjects(setProjects, setLoading, statusFilter);
  }, [statusFilter]);

  // Handle form submission (for both create and edit)
  const onFormSubmit = async (values: IProject) => {
    await handleFormSubmit(
      values,
      setLoading,
      projectToEdit,
      setIsModalOpen,
      setProjects
    );
    setProjectToEdit(null);
  };

  // Handle project editing
  const onEdit = async (projectId?: number) => {
    if (projectId) {
      await handleEdit(projectId, setLoading, setProjectToEdit, setIsModalOpen);
    }
  };

  const onDelete = async (projectId?: number) => {
    if (projectId) {
      await handleDelete(setLoading, projectId, setIsModalOpen);
      await getProjects(setProjects, setLoading);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value); // Update the status filter on selection
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      
        <>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Project
            </button>

            <div className="ml-4">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Projects</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

          </div>
          
          {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
          <><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((item, index) => (
                <ProjectCard
                  key={index}
                  project={item}
                  handleEdit={onEdit}
                  handleDelete={onDelete} />
              ))}
            </div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold mb-4">
                    {projectToEdit ? "Edit Project" : "Add New Project"}
                  </h2>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    onClick={() => setIsModalOpen(false)}
                    className="cursor-pointer"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
                <ProjectForm
                  onSubmit={onFormSubmit}
                  initialValues={projectToEdit ? { ...projectToEdit } : undefined} />
              </Modal></>
      )}
        </>
      
    </div>
  );
};

export default Project;

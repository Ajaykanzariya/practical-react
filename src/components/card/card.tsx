import React from "react";
import { IProject } from "../../interface/interfaces";
import Swal from "sweetalert2"; // Import SweetAlert2

interface ProjectCardProps {
  project: IProject;
  handleEdit?: (id?: number) => void;
  handleDelete?: (id: number) => void;  // Add a prop to handle delete action
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, handleEdit, handleDelete }) => {
  
  const handleDeleteClick = (id?: number) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API if confirmed
        if(id){
            handleDelete && handleDelete(id);  // Call the delete function passed from parent
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your project has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs overflow-hidden">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-500 truncate">{project.description}</p>

      <span className="px-3 py-1 text-white text-xs font-semibold rounded-full bg-blue-500">
        {project.status}
      </span>

      <p className="text-sm text-gray-400 mt-2">{project.due_date}</p>

      <div className="flex space-x-2 mt-4">
        <button 
          onClick={() => handleEdit && handleEdit(project.id)} 
          className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
        >
          Edit
        </button>
        <button 
          onClick={() => handleDeleteClick(project.id)}  // Trigger delete confirmation
          className="text-red-500 hover:text-red-700 text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

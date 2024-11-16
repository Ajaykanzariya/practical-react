// src/components/ProjectForm.tsx

import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface ProjectFormValues {
  name: string;
  description: string;
  status: string;
  due_date: string;
}

interface ProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  initialValues?: ProjectFormValues; // Optional prop for pre-filling the form
}

const validationSchema = Yup.object({
  name: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  due_date: Yup.date().required("Due date is required").nullable(),
});

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialValues }) => {
  return (
    <Formik
      initialValues={initialValues || { name: '', description: '', status: 'Not Started', due_date: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
            <Field
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Field
              type="text"
              name="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {touched.description && errors.description && (
              <div className="text-red-500 text-sm">{errors.description}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <Field as="select" name="status" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Field>
            {touched.status && errors.status && (
              <div className="text-red-500 text-sm">{errors.status}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
            <Field
              type="date"
              name="due_date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {touched.due_date && errors.due_date && (
              <div className="text-red-500 text-sm">{errors.due_date}</div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;

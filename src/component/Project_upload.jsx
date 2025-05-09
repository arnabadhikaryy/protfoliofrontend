
import React, { useState } from "react";
import axios from "axios";

const ProjectUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    discriotion: "",
    project_link: "",
    projectImage: null,
  });

  const MainUrl = 'https://portfoliobackend-production-6dd7.up.railway.app'
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "projectImage") {
      setFormData({ ...formData, projectImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("discriotion", formData.discriotion);
    data.append("project_link", formData.project_link);
    data.append("projectImage", formData.projectImage);

    try {
      const res = await axios.post(
        MainUrl+"/project/upload/project",
        data
      );
      setMessage("Upload successful!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Upload Project</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          className="input input-bordered"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="discriotion"
          placeholder="Description"
          className="input input-bordered"
          value={formData.discriotion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="project_link"
          placeholder="Project Link"
          className="input input-bordered"
          value={formData.project_link}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="projectImage"
          className="file-input file-input-bordered"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Upload"
          )}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default ProjectUploadForm;

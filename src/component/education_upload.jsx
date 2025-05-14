import React, { useState } from "react";
import axios from "axios";

const EducationUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    discriotion: "",
    coures_certificate_image: null,
  });

  const MainUrl = 'https://portfoliobackend-production-6dd7.up.railway.app'
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coures_certificate_image") {
      setFormData({ ...formData, coures_certificate_image: files[0] });
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
    data.append("coures_certificate_image", formData.coures_certificate_image);

    try {
      let res = await axios.post(MainUrl+"/edu/upload", data);
      if(res.data.status==true){setMessage("Upload successful!");}
      else if(res.data.status==false){setMessage(res.data.message);}
      else{
        setMessage("file uploding fail")
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-cyan-500  shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Education Certificate</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          className="input input-bordered"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="discriotion"
          placeholder="Description"
          className="textarea textarea-bordered"
          value={formData.discriotion}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="coures_certificate_image"
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
      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};

export default EducationUploadForm;

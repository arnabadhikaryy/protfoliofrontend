

import React, { useState } from 'react';
import axios from 'axios';

const UploadService = () => {
  const [formData, setFormData] = useState({
    title: '',
    discriotion: '',
    icon_url: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/service/upload', formData);
      console.log('Success:', response.data);
      alert('Service uploaded successfully!');
    } catch (error) {
      console.error('Error uploading service:', error);
      alert('Failed to upload service');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload New Service</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="discriotion"
          placeholder="Description"
          value={formData.discriotion}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="icon_url"
          placeholder="Icon URL"
          value={formData.icon_url}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadService;

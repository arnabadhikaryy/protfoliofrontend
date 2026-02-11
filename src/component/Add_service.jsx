import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import backend_url from './backend_url';

const UploadService = () => {
   
  const MainUrl = backend_url;

  const [formData, setFormData] = useState({
    title: '',
    discriotion: '',
    icon_url: '',
    price: ''
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token from cookies
    const cookies = document.cookie.split(';').reduce((acc, curr) => {
      const [key, value] = curr.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    const token = cookies.token;

    if (!token) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    // Merge token into form data
    const payload = { ...formData, token };

    try {
      const response = await axios.post(MainUrl+'/service/upload', payload);
      if(response.data.status == true){
        console.log('Success:', response.data);
        toast(response.data.message);
      }

     else if(response.data.status == false){
        console.log('fail:', response.data);
        if(response.data.message == 'Invalid token'){
          toast.error(response.data.error);
        }
        else{
          toast.error(response.data.message);
        }
      
      }
      else{
        toast('somthing worng')
      }
     
    } catch (error) {
      console.error('Error uploading service:', error);
      toast.error('Failed to upload service');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <Toaster/>
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Upload New Service</h2>

      {showAlert && (
        <div
          role="alert"
          className="alert alert-warning mb-4 transition-opacity duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 
              0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 
              0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: You have no access token!</span>
        </div>
      )}

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




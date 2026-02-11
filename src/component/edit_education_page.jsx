import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import backend_url from './backend_url';

const EditEducation = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // State for form fields
  const [title, setTitle] = useState('');
  const [discriotion, setDiscriotion] = useState(''); // Keeping your spelling
  const [currentImage, setCurrentImage] = useState('');
  
  // State for change tracking and files
  const [initialData, setInitialData] = useState({});
  const [newFile, setNewFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. Fetch Data & Pre-fill
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backend_url}/edu/get`);
        console.log(res)
        if (res.data.status == true) {
          // Find the specific item by ID from the array
          const item = res.data.data.find(i => i._id === id);

          if (item) {
            setTitle(item.title);
            setDiscriotion(item.discriotion);
            setCurrentImage(item.certificate_url);
            
            // Save initial state for comparison later
            setInitialData({
              title: item.title,
              discriotion: item.discriotion,
              image: item.certificate_url
            });
          } else {
            toast.error("Education item not found.");
            navigate('/'); 
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate, backend_url]);

  // 2. Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Create local preview URL
    }
  };

  // 3. Check for Changes
  const isChanged = () => {
    return (
      title !== initialData.title ||
      discriotion !== initialData.discriotion ||
      newFile !== null
    );
  };

  // 4. Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged()) return;

    // --- NEW: Retrieve Token from Cookies ---
    // This splits the cookie string to find the value associated with "token="
    const getToken = () => {
      return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    };

    const token = getToken();

    if (!token) {
      toast.error("Authentication failed: No token found.");
      return;
    }
    // ----------------------------------------

    setUpdating(true);
    const formData = new FormData();
    formData.append('id', id); // Required by your backend
    formData.append('title', title);
    formData.append('discriotion', discriotion);
    formData.append('token',token);
    
    if (newFile) {
      formData.append('certificate', newFile);
    }

    try {
      const res = await axios.put(`${backend_url}/edu/edit`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data.status) {
        toast.success("Updated successfully!");
        
        // Update initial data so button disables again
        setInitialData({ title, discriotion, image: previewImage || currentImage });
        setNewFile(null);
        setPreviewImage(null); // Clear preview to show "current" image logic if needed
        
        // Optional: Redirect back after a short delay
        setTimeout(() => navigate('/'), 1500); 
      } else {
        toast.error(res.data.message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
      <div className="animate-pulse">Loading education details...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <Toaster position="top-center" />
      
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white text-center">Edit Education</h2>
          <p className="text-blue-100 text-center text-sm mt-1">Update your academic achievements</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Degree / Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="e.g. Bachelor of Computer Science"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Description</label>
            <textarea 
              value={discriotion} 
              onChange={(e) => setDiscriotion(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Describe your major, grades, or achievements..."
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">Certificate Image</label>
            
            <div className="relative group w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-400 transition-colors">
              
              {/* Image Preview Logic */}
              {previewImage ? (
                <img src={previewImage} alt="New Preview" className="w-full h-full object-cover" />
              ) : currentImage ? (
                <img src={currentImage} alt="Current" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="text-gray-400 text-sm">No image uploaded</div>
              )}

              {/* Overlay for uploading */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                 <span className="text-white font-medium bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">Change Image</span>
              </div>
              
              {/* Hidden Actual Input */}
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={!isChanged() || updating}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md
              ${!isChanged() || updating 
                ? 'bg-gray-400 cursor-not-allowed opacity-70 shadow-none' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
          >
            {updating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Update Details"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEducation;
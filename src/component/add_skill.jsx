
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddSkill() {
  const [skillName, setSkillName] = useState('');
  const [confidence, setConfidence] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!skillName || !confidence || !iconUrl) {
    toast.error('All fields are required');
    return;
  }

  setLoading(true);

  try {
    // 1. Get the token from the cookie
    const token = Cookies.get('token');

    if(!token){
        toast.error('token not found');
        return;
    }

    // 2. Send token along with other form data in the body
    const res = await axios.post(
      'http://localhost:8000/basic/add/skill',
      {
        skill_name: skillName,
        confidance: confidence,
        icon_url: iconUrl,
        token: token, // Include the token in request body
      },
      { withCredentials: true }
    );

    if (res.data.status === true) {
      toast.success(res.data.message);
      setSkillName('');
      setConfidence('');
      setIconUrl('');
    } else {
        if(res.data.error){
            toast.error(res.data.error);
        }
        else{
           toast.error(res.data.message || 'Failed to add skill');
        }
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="ml-[30%] mt-[10%]">
      <Toaster />
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4 w-[50%]">
        <input
          type="text"
          placeholder="Skill Name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Confidence (e.g., 90%)"
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Icon URL"
          value={iconUrl}
          onChange={(e) => setIconUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
          ) : (
            'Add Skill'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddSkill;

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

function Create_token() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const MainUrl = 'https://portfoliobackend-production-6dd7.up.railway.app'
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id.length !== 24) {
      toast.error('admin password must be exactly 24 characters');
      setMessage('password must be exactly 24 characters');
      return;
    }

    setLoading(true); // start loading
    setMessage('');

    try {
      const res = await axios.post(MainUrl+'/basic/login', { _id: id }, { withCredentials: true });

      if (res.data.status === true) {
        Cookies.set('token', res.data.token);
        toast.success('Token set successfully. Go back to main page');
        setMessage('Token set successfully. Go back to main page');
      } else {
        if (res.data.message) {
          toast.error(res.data.message);
        }
        setMessage(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
      setMessage('Something went wrong.');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className='ml-[30%] mt-[10%]'>
      <Toaster />
      <form onSubmit={handleSubmit} className="p-4 flex items-center">
        <input
          type="text"
          placeholder="Enter admin password"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            'Get Token'
          )}
        </button>
      </form>
      {message && <p className="p-2 text-red-600">{message}</p>}
    </div>
  );
}

export default Create_token;

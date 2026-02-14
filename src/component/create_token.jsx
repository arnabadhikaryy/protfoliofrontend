import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import backend_url from './backend_url';
import { useNavigate } from 'react-router-dom';

function Create_token() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const MainUrl = backend_url;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id.length !== 24) {
      toast.error('admin id must be exactly 24 characters');
      setMessage('id must be exactly 24 characters');
      return;
    }

    setLoading(true); // start loading
    setMessage('');

    try {
      const res = await axios.post(MainUrl + '/basic/login', { _id: id, password: password }, { withCredentials: true });

      if (res.data.status === true) {
        Cookies.set('token', res.data.token);
        localStorage.setItem('FIXED_ID', id)
        toast.success('Token set successfully. Go back to main page');
        setMessage('Token set successfully. valid for 1 day');
        navigate('/basic/edit');
      } else {
        if (res.data.message) {
          toast.error(res.data.message);
        }
        setMessage(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Wrong credentials or Something went wrong.');
      setMessage('Wrong credentials or Something went wrong.');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your credentials to generate token
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Admin ID
            </label>
            <input
              type="text"
              placeholder="Enter 24 character admin id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Get Token"
            )}
          </button>

          {message && (
            <div className="text-center text-sm mt-2 text-red-600">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );

}

export default Create_token;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, FileText, ExternalLink, UploadCloud } from 'lucide-react'; 
import backend_url from './backend_url';

const EditBasicDetails = () => {
    const navigate = useNavigate();

    // --- 1. State Management ---
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [initialData, setInitialData] = useState(null);

    // Text Fields
    const [formData, setFormData] = useState({
        my_name: '',
        profation: '',
        email: '',
        pnone: '',
        address: '',
        date_of_barth: '',
        language: '',
        linkdin_link: '',
        github_link: ''
    });

    // Skills Array
    const [skills, setSkills] = useState([]);

    // Image Handling
    const [profileImg, setProfileImg] = useState({ file: null, preview: '' });
    const [profImg, setProfImg] = useState({ file: null, preview: '' });

    // Resume Handling
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const [uploadingResume, setUploadingResume] = useState(false); // New state for resume spinner

    // --- 2. Fetch Data ---
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`${backend_url}/basic/get`);
                if (res.data.status) {
                    const data = res.data.data[0];

                    setFormData({
                        my_name: data.my_name || '',
                        profation: data.profation || '',
                        email: data.email || '',
                        pnone: data.pnone || '',
                        address: data.address || '',
                        date_of_barth: data.date_of_barth || '',
                        language: data.language || '',
                        linkdin_link: data.linkdin_link || '',
                        github_link: data.github_link || ''
                    });

                    setSkills(data.skills || []);
                    setProfileImg({ file: null, preview: data.prifile_url });
                    setProfImg({ file: null, preview: data.profational_profile_pic_url });
                    setResumeUrl(data.resume_url || '');

                    setInitialData({
                        formData: {
                            my_name: data.my_name || '',
                            profation: data.profation || '',
                            email: data.email || '',
                            pnone: data.pnone || '',
                            address: data.address || '',
                            date_of_barth: data.date_of_barth || '',
                            language: data.language || '',
                            linkdin_link: data.linkdin_link || '',
                            github_link: data.github_link || ''
                        },
                        skills: data.skills || [],
                        profileImgPreview: data.prifile_url || '',
                        profImgPreview: data.profational_profile_pic_url || '',
                        resumeUrl: data.resume_url || ''
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to load details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    // --- 3. Handlers ---

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            if (type === 'profile') {
                setProfileImg({ file, preview });
            } else {
                setProfImg({ file, preview });
            }
        }
    };

    const handleResumeSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResumeFile(file);
        }
    };

    // --- NEW: Separate Resume Upload Function ---
    const handleResumeUpload = async () => {
        if (!resumeFile) return;

        const getToken = () => document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const token = getToken();
        if (!token) return toast.error("Please login first.");

        setUploadingResume(true);
        const data = new FormData();
        data.append('resume', resumeFile);
        data.append('token', token); // Uncomment if backend needs token in body

        try {
            const res = await axios.put(`${backend_url}/basic/upload-resume`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status) {
                toast.success("Resume uploaded successfully!");
                // Update URL from response
                setResumeUrl(res.data.data.resume_url); 
                setResumeFile(null); // Clear input
            } else {
                toast.error(res.data.message || "Resume upload failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Resume upload failed.");
        } finally {
            setUploadingResume(false);
        }
    };

    // Skills Logic
    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };
    const addSkill = () => setSkills([...skills, { skill_name: '', confidance: 0, icon_url: '' }]);
    const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

    // --- 4. Main Submit Logic (Text & Images only) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const getToken = () => document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const token = getToken();

        if (!token) {
            toast.error("Please login first.");
            setUpdating(false);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('skills', JSON.stringify(skills));
        data.append('token', token);

        if (profileImg.file) data.append('profile_pic', profileImg.file);
        if (profImg.file) data.append('professional_pic', profImg.file);

        try {
            const res = await axios.put(`${backend_url}/basic/update-basic-details`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status) {
                toast.success("Details updated successfully!");
                setInitialData(prev => ({
                    ...prev,
                    formData: { ...formData },
                    skills: [...skills],
                    profileImgPreview: profileImg.preview,
                    profImgPreview: profImg.preview
                }));
            } else {
                toast.error(res.data.message || "Update failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error occurred.");
        } finally {
            setUpdating(false);
        }
    };

    const hasChanges = () => {
        if (!initialData) return false;
        if (JSON.stringify(initialData.formData) !== JSON.stringify(formData)) return true;
        if (JSON.stringify(initialData.skills) !== JSON.stringify(skills)) return true;
        if (profileImg.file || profImg.file) return true;
        return false;
    };

    if (loading) return <div className="text-center mt-20">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
            <Toaster position="top-right" />

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-slate-800 text-white p-6">
                    <h1 className="text-2xl font-bold">Edit Basic Details</h1>
                    <p className="text-slate-400 text-sm">Manage your personal information, images, resume, and skills.</p>
                </div>

                <div className="p-8 space-y-8">

                    {/* --- Section 1: Images & Resume --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Profile Pic */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Main Profile Picture</label>
                            <div className="flex items-center gap-4">
                                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
                                    {profileImg.preview ? (
                                        <img src={profileImg.preview} alt="Profile" className="h-full w-full object-cover" />
                                    ) : <div className="h-full w-full flex items-center justify-center text-gray-400">No Img</div>}
                                </div>
                                <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                                    Change
                                    <input type="file" onChange={(e) => handleImageChange(e, 'profile')} className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* Professional Pic */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Professional/About Picture</label>
                            <div className="flex items-center gap-4">
                                <div className="h-24 w-24 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                                    {profImg.preview ? (
                                        <img src={profImg.preview} alt="Professional" className="h-full w-full object-cover" />
                                    ) : <div className="h-full w-full flex items-center justify-center text-gray-400">No Img</div>}
                                </div>
                                <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                                    Change
                                    <input type="file" onChange={(e) => handleImageChange(e, 'prof')} className="hidden" accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* NEW: Independent Resume Upload Section */}
                        <div className="md:col-span-2 space-y-2 pt-4 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700">Resume / CV (PDF)</label>
                            <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <FileText className="text-slate-400 w-8 h-8 hidden md:block" />
                                
                                <div className="flex-1">
                                    {resumeUrl && (
                                        <div className="mb-2 text-sm">
                                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                                <ExternalLink size={14} /> View Current Resume
                                            </a>
                                        </div>
                                    )}
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <input 
                                            type="file" 
                                            onChange={handleResumeSelect} 
                                            accept="application/pdf"
                                            className="block w-full text-sm text-slate-500
                                              file:mr-4 file:py-2 file:px-4
                                              file:rounded-full file:border-0
                                              file:text-sm file:font-semibold
                                              file:bg-blue-50 file:text-blue-700
                                              hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>

                                {/* Separate Upload Button for Resume */}
                                <button 
                                    type="button"
                                    onClick={handleResumeUpload}
                                    disabled={!resumeFile || uploadingResume}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition shadow-sm
                                        ${!resumeFile || uploadingResume 
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                            : 'bg-amber-500 text-white hover:bg-amber-600'}`}
                                >
                                    {uploadingResume ? 'Uploading...' : <><UploadCloud size={18} /> Upload New Resume</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* --- Section 2: Personal Info --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" name="my_name" value={formData.my_name} onChange={handleInputChange} />
                            <InputField label="Profession (Title)" name="profation" value={formData.profation} onChange={handleInputChange} />
                            <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
                            <InputField label="Phone Number" name="pnone" value={formData.pnone} onChange={handleInputChange} type="number" />
                            <InputField label="Date of Birth" name="date_of_barth" value={formData.date_of_barth} onChange={handleInputChange} />
                            <InputField label="Languages" name="language" value={formData.language} onChange={handleInputChange} />
                            <div className="md:col-span-2">
                                <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        {/* --- Section 3: Social Links --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="LinkedIn URL" name="linkdin_link" value={formData.linkdin_link} onChange={handleInputChange} />
                            <InputField label="GitHub URL" name="github_link" value={formData.github_link} onChange={handleInputChange} />
                        </div>

                        <hr className="border-gray-100" />

                        {/* --- Section 4: Skills Manager --- */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Skills & Confidence</h3>
                            </div>

                            <div className="space-y-3">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-3 items-end md:items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex-1 w-full">
                                            <input
                                                type="text"
                                                placeholder="Skill Name"
                                                value={skill.skill_name}
                                                onChange={(e) => handleSkillChange(index, 'skill_name', e.target.value)}
                                                className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="w-full md:w-32">
                                            <input
                                                type="number"
                                                placeholder="%"
                                                min="0" max="100"
                                                value={skill.confidance}
                                                onChange={(e) => handleSkillChange(index, 'confidance', e.target.value)}
                                                className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                type="text"
                                                placeholder="Icon URL / Class"
                                                value={skill.icon_url}
                                                onChange={(e) => handleSkillChange(index, 'icon_url', e.target.value)}
                                                className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={addSkill}
                                className="flex items-center gap-1 text-sm bg-green-50 text-green-600 px-3 py-1 mt-3 rounded hover:bg-green-100 font-medium"
                            >
                                <Plus size={16} /> Add Skill
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={updating || !hasChanges()}
                                className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {updating ? 'Updating...' : <><Save size={20} /> Save Details & Images</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
    </div>
);

export default EditBasicDetails;
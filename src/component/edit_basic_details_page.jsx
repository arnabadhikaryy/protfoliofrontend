import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
    Plus, Trash2, Save, FileText, ExternalLink,
    UploadCloud, Book, Briefcase, X, Edit2,
    Image as ImageIcon, Loader2, Eye, EyeOff, User
} from 'lucide-react';
import backend_url from './backend_url';

// --- Utility Components ---
const Spinner = ({ size = 20, className = "" }) => (
    <Loader2 size={size} className={`animate-spin ${className}`} />
);

const EditBasicDetails = () => {
    let FIXED_ID = '681356ffa45cc9985cecd198';
    const navigate = useNavigate();
    // --- 1. State Management ---
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [isDirty, setIsDirty] = useState(false); // Tracks if changes made

    // Store original data to compare against for "Dirty" check
    const [originalData, setOriginalData] = useState(null);

    // Basic Details
    const [formData, setFormData] = useState({
        my_name: '', profation: '', email: '', pnone: '', address: '',
        date_of_barth: '', language: '', linkdin_link: '', github_link: '',
        about_me: '', exprience: 0, project_count: 0
    });

    const [skills, setSkills] = useState([]);

    // Profile Images
    const [profileImg, setProfileImg] = useState({ file: null, preview: '' });
    const [profImg, setProfImg] = useState({ file: null, preview: '' });

    // Resume
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState('');
    const [showResumePreview, setShowResumePreview] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);

    // Lists
    const [educationList, setEducationList] = useState([]);
    const [projectList, setProjectList] = useState([]);

    // Modal State
    const [modalType, setModalType] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [modalData, setModalData] = useState({});
    const [modalFile, setModalFile] = useState(null);

    // NEW: Loading state for Modal Submission
    const [savingModal, setSavingModal] = useState(false);

    // --- 2. Fetch Data ---
    const fetchDetails = async () => {
        try {

            let currentURL = window.location.href;
            console.log('current url is: ',currentURL);


            const res = await axios.get(`${backend_url}/basic/get-portfolio`);
            if (res.data.status) {
                const info = res.data.data;

                const fetchedForm = {
                    my_name: info.my_name || '',
                    profation: info.profation || '',
                    email: info.email || '',
                    pnone: info.pnone || '',
                    address: info.address || '',
                    date_of_barth: info.date_of_barth || '',
                    language: info.language || '',
                    linkdin_link: info.linkdin_link || '',
                    github_link: info.github_link || '',
                    about_me: info.about_me || '',
                    project_count: info.project_count || 0,
                    exprience: info.exprience || 0
                };

                const fetchedSkills = info.skills || [];

                setFormData(fetchedForm);
                setSkills(fetchedSkills);
                setProfileImg({ file: null, preview: info.prifile_url });
                setProfImg({ file: null, preview: info.profational_profile_pic_url });
                setResumeUrl(info.resume_url || '');
                setEducationList(info.education || []);
                setProjectList(info.projects || []);

                // Save original state for comparison
                setOriginalData({
                    formData: fetchedForm,
                    skills: fetchedSkills
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    // --- 3. Change Detection Logic ---
    useEffect(() => {
        if (!originalData) return;

        const isFormChanged = JSON.stringify(formData) !== JSON.stringify(originalData.formData);
        const isSkillsChanged = JSON.stringify(skills) !== JSON.stringify(originalData.skills);
        const isImagesChanged = profileImg.file !== null || profImg.file !== null;

        setIsDirty(isFormChanged || isSkillsChanged || isImagesChanged);
    }, [formData, skills, profileImg.file, profImg.file, originalData]);

    const getToken = () => {
       let tokennn =  document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      // console.log('token is: ',tokennn);
       return tokennn;
    }

    // --- 4. Handlers ---
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            type === 'profile' ? setProfileImg({ file, preview }) : setProfImg({ file, preview });
        }
    };

    const handleSkillChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };
    const addSkill = () => setSkills([...skills, { skill_name: '', confidance: 0, icon_url: '' }]);
    const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

    const handleSubmitBasic = async (e) => {
        e.preventDefault();
        if (!isDirty) return;

        setUpdating(true);
        const token = getToken();

        if(!token){
            toast.error('please login, only authorised person can do action');
            setUpdating(false);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('skills', JSON.stringify(skills));
        data.append('FIXED_ID', FIXED_ID);
        data.append('token', token);
        if (profileImg.file) data.append('profile_pic', profileImg.file);
        if (profImg.file) data.append('professional_pic', profImg.file);

        try {
            const res = await axios.put(`${backend_url}/basic/update-basic`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.status) {
                toast.success("Basic details updated!");
                // Update original data to new state so button disables again
                setOriginalData({ formData, skills });
                setProfileImg(prev => ({ ...prev, file: null }));
                setProfImg(prev => ({ ...prev, file: null }));
            } else toast.error(res.data.message);
        } catch (error) {
            toast.error("Server error occurred.");
        } finally {
            setUpdating(false);
        }
    };

    // --- 5. Resume Handler ---
    const handleResumeUpload = async () => {
        if (!resumeFile) return;
        const token = getToken();
        setUploadingResume(true);
        const data = new FormData();
        data.append('resume', resumeFile);
        data.append('token', token);
        data.append('FIXED_ID', FIXED_ID)

        try {
            const res = await axios.put(`${backend_url}/basic/upload-resume`, data, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                 }
            });
            if (res.data.status) {
                toast.success("Resume uploaded!");
                setResumeUrl(res.data.data.resume_url);
                setResumeFile(null);
            } else toast.error(res.data.message);
        } catch (error) {
            toast.error("Resume upload failed.");
        } finally {
            setUploadingResume(false);
        }
    };

    // --- 6. Modal Logic ---
    const openModal = (type, mode, data = {}) => {
        setModalType(type);
        setModalMode(mode);
        setModalFile(null);
        setSavingModal(false); // Ensure loading state is reset when opening

        if (mode === 'add') {
            setModalData(type === 'education'
                ? { title: '', discriotion: '', start_year: '', end_year: '' }
                : { title: '', discriotion: '', project_link: '', technologies_used: '' }
            );
            setCurrentEditId(null);
        } else {
            setModalData(data);
            setCurrentEditId(data._id);
        }
    };

    const closeModal = () => {
        setModalType(null);
        setModalMode(null);
        setModalData({});
        setModalFile(null);
        setSavingModal(false);
    };

    const handleModalSubmit = async () => {
        const token = getToken();
        if (!token) return toast.error("Please login.");

        setSavingModal(true); // START LOADING

        const isEdu = modalType === 'education';
        const baseRoute = isEdu ? '/basic/education' : '/basic/project';
        const endpoint = modalMode === 'add' ? `${baseRoute}/add` : `${baseRoute}/edit`;

        const payload = new FormData();
        Object.keys(modalData).forEach(key => {
            if (key !== '_id' && key !== 'certificate_url' && key !== 'project_snap_url') {
                payload.append(key, modalData[key]);
            }
        });

        if (modalMode === 'edit') payload.append(isEdu ? 'eduId' : 'projectId', currentEditId);
        if (modalFile) payload.append(isEdu ? 'certificate' : 'snapshot', modalFile);
        payload.append('token', token);
        payload.append('FIXED_ID', FIXED_ID);

        try {
            const method = modalMode === 'add' ? 'post' : 'put';
            const res = await axios[method](`${backend_url}${endpoint}`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.status) {
                toast.success(`${isEdu ? 'Education' : 'Project'} saved!`);
                await fetchDetails(); // Wait for fetch to ensure UI updates before closing
                closeModal();
            } else {
                toast.error(res.data.message || "Operation failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server Error");
        } finally {
            setSavingModal(false); // STOP LOADING
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm("Are you sure?")) return;
        const token = getToken();

        try {
            let res;
            if (type === 'education') {
                res = await axios.delete(`${backend_url}/basic/education/delete`, { data: { eduId: id, token, FIXED_ID } });
            } else {
                res = await axios.post(`${backend_url}/basic/project/delete`, { projectId: id, token, FIXED_ID });
            }

            if (res.data.status) {
                toast.success("Deleted successfully");
                fetchDetails();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    // --- 7. Loading View ---
    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-500">
            <Spinner size={40} className="text-blue-600 mb-4" />
            <p className="animate-pulse">Loading your portfolio...</p>
        </div>
    );

    // --- 8. Main Render ---
    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans text-slate-800">
            <Toaster position="top-right" />

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Portfolio Editor</h1>
                        <p className="text-sm text-slate-500">Manage your profile details and showcase</p>
                    </div>
                    {/* Global Save Indicator */}
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${isDirty ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        <div className={`w-2 h-2 rounded-full ${isDirty ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                        {isDirty ? 'Unsaved Changes' : 'All Saved'}
                    </div>
                    <button
                        onClick={() => {
                            navigate('/create/token')
                        }}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                        Go to Admin Login
                    </button>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* --- LEFT COLUMN (Images & Resume) --- */}
                    <div className="space-y-6">
                        {/* Profile Pictures Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2"><ImageIcon size={18} /> Profile Images</h3>

                            <div className="space-y-6">
                                {/* Profile Pic */}
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner bg-slate-50">
                                            {profileImg.preview ? (
                                                <img src={profileImg.preview} alt="Profile" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-300"><User size={32} /></div>
                                            )}
                                        </div>
                                        <label className="absolute inset-0  bg-opacity-100 group-hover:bg-opacity-30 flex items-center justify-center cursor-pointer transition-all rounded-full">
                                            <input type="file" onChange={(e) => handleImageChange(e, 'profile')} className="hidden" accept="image/*" />
                                            <Edit2 className="text-white opacity-0 group-hover:opacity-100" size={16} />
                                        </label>
                                    </div>
                                    <div>
                                        <p onClick={() => { console.log('profileImg ', profileImg.preview) }} className="text-sm font-medium">Avatar</p>
                                        <p className="text-xs text-slate-500">Visible on header</p>
                                    </div>
                                </div>

                                <hr className="border-slate-100" />

                                {/* Professional Pic */}
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <div className="h-24 w-20 rounded-lg overflow-hidden border-2 border-slate-100 shadow-inner bg-slate-50">
                                            {profImg.preview ? (
                                                <img src={profImg.preview} alt="Prof" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-300"><User size={32} /></div>
                                            )}
                                        </div>
                                        <label className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center cursor-pointer transition-all rounded-lg">
                                            <input type="file" onChange={(e) => handleImageChange(e, 'prof')} className="hidden" accept="image/*" />
                                            <Edit2 className="text-white opacity-0 group-hover:opacity-100" size={16} />
                                        </label>
                                    </div>
                                    <div>
                                        <p onClick={() => { console.log('profImg ', profImg) }} className="text-sm font-medium">Full Photo</p>
                                        <p className="text-xs text-slate-500">For Hero section</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText size={18} /> Resume / CV</h3>

                            <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 text-center">
                                <input
                                    type="file"
                                    id="resume-upload"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                    accept="application/pdf"
                                    className="hidden"
                                />
                                <label htmlFor="resume-upload" className="cursor-pointer block">
                                    <div className="mx-auto w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                        <UploadCloud size={20} />
                                    </div>
                                    <span className="text-sm text-blue-600 font-medium hover:underline">Click to upload PDF</span>
                                    {resumeFile && <p className="text-xs text-gray-500 mt-1">{resumeFile.name}</p>}
                                </label>
                            </div>

                            <button
                                onClick={handleResumeUpload}
                                disabled={!resumeFile || uploadingResume}
                                className="mt-3 w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {uploadingResume ? <><Spinner size={16} /> Uploading...</> : 'Save Resume'}
                            </button>

                            {resumeUrl && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-center">
                                        <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
                                            <ExternalLink size={12} /> Open in new tab
                                        </a>
                                        <button
                                            onClick={() => setShowResumePreview(!showResumePreview)}
                                            className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900"
                                        >
                                            {showResumePreview ? <><EyeOff size={12} /> Hide Preview</> : <><Eye size={12} /> Preview PDF</>}
                                        </button>
                                    </div>

                                    {/* PDF PREVIEW IFRAME */}
                                    {showResumePreview && (
                                        <div className="mt-3 h-64 bg-gray-100 rounded border overflow-hidden">
                                            <iframe src={resumeUrl} title="Resume Preview" className="w-full h-full" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (Forms) --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Basic Details Form */}
                        <form onSubmit={handleSubmitBasic} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-slate-800">Basic Information</h3>
                                <button
                                    type="submit"
                                    disabled={!isDirty || updating}
                                    className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${isDirty
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:-translate-y-0.5'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {updating ? <Spinner size={18} className="text-white" /> : <Save size={18} />}
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputGroup label="Full Name" name="my_name" value={formData.my_name} onChange={handleInputChange} />
                                <InputGroup label="Profession" name="profation" value={formData.profation} onChange={handleInputChange} />
                                <InputGroup label="about you" name="about_me" value={formData.about_me} onChange={handleInputChange} />
                                <InputGroup label="Email" name="email" value={formData.email} onChange={handleInputChange} />
                                <InputGroup label="Phone" name="pnone" value={formData.pnone} onChange={handleInputChange} type="number" />
                                <InputGroup label="Date of Birth" name="date_of_barth" value={formData.date_of_barth} onChange={handleInputChange} />
                                <InputGroup label="Languages" name="language" value={formData.language} onChange={handleInputChange} />
                                <div className="md:col-span-2">
                                    <InputGroup label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                                </div>
                                <InputGroup label="LinkedIn URL" name="linkdin_link" value={formData.linkdin_link} onChange={handleInputChange} />
                                <InputGroup label="GitHub URL" name="github_link" value={formData.github_link} onChange={handleInputChange} />

                                <InputGroup label="exprience" name="exprience" value={formData.exprience} onChange={handleInputChange} />
                                <InputGroup label="project count" name="project_count" value={formData.project_count} onChange={handleInputChange} />
                            </div>

                            {/* Skills Section */}
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-bold text-slate-700">Skills & Expertise</label>
                                    <button type="button" onClick={addSkill} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-medium hover:bg-blue-100 transition-colors flex items-center gap-1">
                                        <Plus size={14} /> Add Skill
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {skills.map((skill, i) => (
                                        <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200 group focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                            <input
                                                value={skill.skill_name}
                                                onChange={(e) => handleSkillChange(i, 'skill_name', e.target.value)}
                                                placeholder="Skill Name (e.g. React)"
                                                className="bg-transparent text-sm w-full outline-none text-slate-700 font-medium placeholder:font-normal"
                                            />
                                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-slate-200">
                                                <input
                                                    value={skill.confidance}
                                                    onChange={(e) => handleSkillChange(i, 'confidance', e.target.value)}
                                                    placeholder="0"
                                                    type="number"
                                                    className="bg-transparent text-sm w-8 outline-none text-right font-mono"
                                                />
                                                <span className="text-xs text-slate-400">%</span>
                                            </div>
                                            <button type="button" onClick={() => removeSkill(i)} className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {skills.length === 0 && <p className="text-sm text-slate-400 italic">No skills added yet.</p>}
                                </div>
                            </div>
                        </form>

                        {/* Education Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Book className="text-blue-500" size={20} /> Education</h3>
                                <button onClick={() => openModal('education', 'add')} className="btn-secondary">
                                    <Plus size={16} /> Add New
                                </button>
                            </div>
                            <div className="space-y-4">
                                {educationList.length === 0 ? <EmptyState text="No education details added." /> : educationList.map((edu) => (
                                    <div key={edu._id} className="group flex items-start justify-between p-4 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{edu.title}</h4>
                                            <p className="text-slate-600 text-sm">{edu.discriotion}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{edu.start_year} - {edu.end_year}</span>
                                                {edu.certificate_url && (
                                                    <a href={edu.certificate_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                                        <ExternalLink size={10} /> Certificate
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal('education', 'edit', edu)} className="action-btn text-blue-600 bg-blue-50"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDelete('education', edu._id)} className="action-btn text-red-600 bg-red-50"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><Briefcase className="text-purple-500" size={20} /> Projects</h3>
                                <button onClick={() => openModal('project', 'add')} className="btn-secondary">
                                    <Plus size={16} /> Add New
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {projectList.length === 0 ? <EmptyState text="No projects added." /> : projectList.map((proj) => (
                                    <div key={proj._id} className="group relative bg-white border border-slate-200 p-4 rounded-xl hover:shadow-md transition-all">
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal('project', 'edit', proj)} className="action-btn text-blue-600 bg-blue-50"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDelete('project', proj._id)} className="action-btn text-red-600 bg-red-50"><Trash2 size={14} /></button>
                                        </div>

                                        <div className="pr-16"> {/* Padding for buttons */}
                                            <h4 className="font-bold text-slate-800">{proj.title}</h4>
                                            <p className="text-xs text-purple-600 font-medium mb-2">{proj.technologies_used}</p>
                                            <p className="text-slate-600 text-sm line-clamp-2">{proj.discriotion}</p>
                                        </div>

                                        <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100">
                                            {proj.project_link && (
                                                <a href={proj.project_link} target="_blank" rel="noreferrer" className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1 font-medium">
                                                    <ExternalLink size={14} /> Live Demo
                                                </a>
                                            )}
                                            {proj.project_snap_url && (
                                                <a href={proj.project_snap_url} target="_blank" rel="noreferrer" className="text-xs text-slate-600 hover:text-blue-600 flex items-center gap-1 font-medium">
                                                    <ImageIcon size={14} /> View Snapshot
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {modalType && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg capitalize text-slate-800">{modalMode} {modalType}</h3>
                            <button onClick={closeModal} disabled={savingModal} className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-1 rounded-full shadow-sm"><X size={20} /></button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            {modalType === 'education' ? (
                                <>
                                    <InputGroup label="Title" value={modalData.title} onChange={e => setModalData({ ...modalData, title: e.target.value })} placeholder="title.." />
                                    <InputGroup label="Description" value={modalData.discriotion} onChange={e => setModalData({ ...modalData, discriotion: e.target.value })} placeholder="Description.." />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputGroup label="Start date" value={modalData.start_year} onChange={e => setModalData({ ...modalData, start_year: e.target.value })} placeholder="1/jan/2026" />
                                        <InputGroup label="End date" value={modalData.end_year} onChange={e => setModalData({ ...modalData, end_year: e.target.value })} placeholder="1/may/2026" />
                                    </div>
                                    <FileInput label="Certificate Image" onChange={e => setModalFile(e.target.files[0])} />
                                </>
                            ) : (
                                <>
                                    <InputGroup label="Project Title" value={modalData.title} onChange={e => setModalData({ ...modalData, title: e.target.value })} />
                                    <InputGroup label="Technologies Used" value={modalData.technologies_used} onChange={e => setModalData({ ...modalData, technologies_used: e.target.value })} placeholder="React, Node, MongoDB" />
                                    <InputGroup label="Project Link" value={modalData.project_link} onChange={e => setModalData({ ...modalData, project_link: e.target.value })} placeholder="https://..." />
                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-slate-700">Description</label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                                            value={modalData.discriotion || ''}
                                            onChange={e => setModalData({ ...modalData, discriotion: e.target.value })}
                                        />
                                    </div>
                                    <FileInput label="Project Snapshot" onChange={e => setModalFile(e.target.files[0])} />
                                </>
                            )}
                        </div>

                        <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button
                                onClick={closeModal}
                                disabled={savingModal}
                                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg text-sm transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalSubmit}
                                disabled={savingModal}
                                className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg text-sm hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {savingModal ? (
                                    <>
                                        <Spinner size={16} className="text-white" />
                                        <span>{modalMode === 'add' ? 'Adding...' : 'Saving...'}</span>
                                    </>
                                ) : (
                                    modalMode === 'add' ? 'Add Item' : 'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Sub Components for cleaner JSX ---

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text" }) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</label>
        <input
            name={name}
            type={type}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
        />
    </div>
);

const FileInput = ({ label, onChange }) => (
    <div className="border border-dashed border-slate-300 bg-slate-50 p-3 rounded-lg">
        <label className="text-sm font-semibold text-slate-600 block mb-2">{label}</label>
        <input type="file" onChange={onChange} className="text-sm w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*" />
    </div>
);

const EmptyState = ({ text }) => (
    <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
        <p className="text-slate-400 text-sm">{text}</p>
    </div>
);

// Styles
const btnSecondaryClass = "bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm font-medium";
const actionBtnClass = "p-1.5 rounded-md hover:scale-110 transition-transform";

export default EditBasicDetails;
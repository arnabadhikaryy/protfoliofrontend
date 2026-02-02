import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const navigate = useNavigate();
  const MainUrl = 'https://portfoliobackend-production-6dd7.up.railway.app'

  const [basic_details, set_basic_details] = useState([]);
  const [basic_detail_load, set_basic_detail_load] = useState(true)

  const [education_details, set_education_details] = useState([]);
  const [education_details_load, set_education_details_load] = useState(true)

  const [project_details, set_project_details] = useState([]);
  const [project_details_load, set_project_details_load] = useState(true)

  const [service_details, set_service_details] = useState([]);
  const [service_details_load, set_service_details_load] = useState(true)


  useEffect(() => {
    const facedetails = async () => {
      try {

        if(
          basic_details.length === 0 &&
          education_details.length === 0 &&
          project_details.length === 0 &&
          service_details.length === 0
        ){

        const response_basic = await axios.get(MainUrl+'/basic/get');
        // console.log("basic data response is", response_basic.data.data);

        const response_project = await axios.get(MainUrl+'/project/get');
        // console.log("project data response is", response_project.data.data);

        const response_education = await axios.get(MainUrl+'/edu/get');
        // console.log("education data response is", response_education.data.data);

        const response_service = await axios.get(MainUrl+'/service/get');
        // console.log("service data response is", response_service.data.data);

        if (response_basic.data.data) {
          set_basic_details(response_basic.data.data);
          set_basic_detail_load(false);
        } 

        if (response_project.data.data) {
          set_project_details(response_project.data.data);
          set_project_details_load(false);
        }

        if (response_education.data.data) {
          set_education_details(response_education.data.data);
          set_education_details_load(false);
        }

        if (response_service.data.data) {
          set_service_details(response_service.data.data);
          set_service_details_load(false);
        }

        }
      } catch (error) {
        console.error('API error:', error);
      }
    };

    facedetails();
  }, []);

  const check_token = (url) => {
    const cookies = document.cookie.split(';').reduce((acc, curr) => {
      const [key, value] = curr.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    if (!cookies.token) {
      toast.error("You have no access token ! for create a access token go to '/create/token' URL..");
      return;
    }

    navigate(url);
  };


  return (
    <div className="drawer lg:drawer-open font-sans text-slate-800 bg-slate-50">
       <Toaster />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Mobile Menu Button */}
      <div className="drawer-content flex flex-col items-start justify-start">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-circle btn-ghost fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>

        {/* MAIN CONTENT AREA */}
        <div className="w-full min-h-screen pb-10">

          {/* HERO SECTION */}
          <div className="relative w-full bg-slate-900 text-white overflow-hidden">
             {/* Background Image with Overlay */}
            
             
             <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    I'm {basic_detail_load ? "..." : basic_details[0]?.my_name}
                    <span className="block text-amber-500 mt-2">Full Stack Developer</span>
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
                    A highly motivated web developer with a passion for coding and creating dynamic, user-friendly websites. Proficient in modern frontend and backend technologies.
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start pt-4">
                    {/* <button className="btn btn-primary bg-amber-600 hover:bg-amber-700 border-none text-white px-8">Hire Me</button>
                    <button className="btn btn-outline text-white hover:bg-white hover:text-black">View Projects</button> */}
                  </div>
                </div>

                {/* Resume / Hero Image Area */}
                <div className="w-full md:w-1/2 flex justify-center h-[400px] bg-white/10 rounded-xl backdrop-blur-sm p-2 shadow-2xl">
                   <object 
                    data="../src/assets/resume/arnab_cv_1edition.pdf" 
                    type="application/pdf" 
                    className="w-full h-full rounded-lg"
                   >
                     <div className="flex items-center justify-center h-full text-white">PDF Preview Unavailable</div>
                   </object>
                </div>
             </div>
          </div>

          <div className="container mx-auto px-4 md:px-8 space-y-24 mt-16">

            {/* EDUCATION SECTION */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Education</h2>
                <p className="text-slate-500 mt-2">My academic achievements, courses, and certifications</p>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              {education_details_load ? (
                <div className="flex justify-center p-10"><span className="loading loading-bars loading-lg text-amber-600"></span></div>
              ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                  {/* Header (Desktop Only) */}
                  <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-800 text-white p-4 rounded-t-lg font-semibold">
                    <div className="col-span-3">Title</div>
                    <div className="col-span-6">Description</div>
                    <div className="col-span-3 text-center">Certificate</div>
                  </div>

                  {/* Rows */}
                  {education_details.map((item, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-12 gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200 items-center hover:shadow-md transition-shadow">
                      <div className="md:col-span-3 font-bold text-amber-600 text-lg md:text-base">{item.title}</div>
                      <div className="md:col-span-6 text-slate-600 text-sm">{item.discriotion}</div>
                      <div className="md:col-span-3 w-full flex justify-center">
                        <div className="h-32 w-full md:w-32 bg-slate-100 rounded-md overflow-hidden border border-slate-200 cursor-pointer group relative" onClick={() => window.open(item.certificate_url, "_blank")}>
                           <img src={item.certificate_url} alt="Cert" className="h-full w-full object-contain group-hover:scale-110 transition-transform" />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 text-xs font-bold bg-white px-2 py-1 rounded">View</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add More */}
                  <button onClick={() => check_token('/upload/servide')} className="w-full py-3 border-2 border-dashed border-slate-300 text-slate-500 font-semibold rounded-lg hover:border-amber-500 hover:text-amber-600 transition-colors">
                    + Add New Education
                  </button>
                </div>
              )}
            </section>


            {/* PROJECT SECTION */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Projects</h2>
                <p className="text-slate-500 mt-2">A showcase of my recent work</p>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              {project_details_load ? (
                <div className="flex justify-center"><span className="loading loading-bars loading-lg text-amber-600"></span></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {project_details.map((item, index) => (
                    <div key={index} className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group">
                      <figure className="h-48 overflow-hidden relative">
                        <img src={item.project_snap_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button onClick={() => window.open(item.project_link, "_blank")} className="btn btn-sm btn-primary">View Demo</button>
                        </div>
                      </figure>
                      <div className="card-body p-6">
                        <h2 className="card-title text-slate-800">{item.title}</h2>
                        <p className="text-slate-500 text-sm line-clamp-3">{item.discriotion}</p>
                      </div>
                    </div>
                  ))}

                  {/* Add Project Card */}
                  <div onClick={() => check_token('/upload/project')} className="card h-full min-h-[300px] border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-amber-500 transition-all group">
                     <div className="text-center">
                        <div className="text-4xl text-slate-300 group-hover:text-amber-500 mb-2">+</div>
                        <span className="font-semibold text-slate-400 group-hover:text-amber-600">Add Project</span>
                     </div>
                  </div>
                </div>
              )}
            </section>


            {/* SERVICE SECTION */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Services</h2>
                <p className="text-slate-500 mt-2">What I can do for you</p>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service_details_load ? (
                  <div className="col-span-full flex justify-center"><span className="loading loading-bars loading-lg text-amber-600"></span></div>
                ) : (
                  service_details.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-md border-t-4 border-amber-500 hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center h-full">
                      <div className="h-20 w-20 mb-4 p-2 bg-amber-50 rounded-full">
                        <img src={item.icon_url} alt="Icon" className="object-contain w-full h-full" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-sm mb-4 flex-grow">
                        {item.discriotion}
                      </p>
                      <div className="mt-auto w-full">
                         <p className="text-amber-600 font-bold text-lg mb-3">₹{item.price}</p>
                         <button className="btn btn-outline btn-sm w-full hover:bg-amber-500 hover:border-amber-500">Contact Me</button>
                      </div>
                    </div>
                  ))
                )}

                 {/* Add Service Card */}
                 <div onClick={() => check_token('/upload/servide')} className="rounded-xl p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all min-h-[300px]">
                    <span className="text-4xl mb-2">✨</span>
                    <h3 className="font-bold text-lg text-slate-400">New Service</h3>
                    <p className="text-xs text-slate-400">Click to add</p>
                 </div>
              </div>
            </section>


            {/* CONTACT SECTION */}
            <section className="max-w-xl mx-auto mb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Contact Me</h2>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="form-control w-full mb-4">
                  <label className="label"><span className="label-text font-semibold">Your Name</span></label>
                  <input type="text" placeholder="John Doe" className="input input-bordered w-full focus:outline-none focus:border-amber-500" />
                </div>

                <div className="form-control w-full mb-4">
                  <label className="label"><span className="label-text font-semibold">Email Address</span></label>
                  <input type="email" placeholder="mail@site.com" className="input input-bordered w-full focus:outline-none focus:border-amber-500" required />
                </div>

                <div className="form-control w-full mb-6">
                  <label className="label"><span className="label-text font-semibold">Message</span></label>
                  <textarea className="textarea textarea-bordered h-32 focus:outline-none focus:border-amber-500" placeholder="Tell me about your project..."></textarea>
                </div>

                <button className="btn bg-slate-900 text-white hover:bg-amber-600 w-full border-none">Send Message</button>
              </div>
            </section>

          </div> {/* End Container */}

          {/* FOOTER */}
          <footer className="bg-slate-900 text-slate-300 py-12 px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">ARNAB ADHIKARY</h2>
            <div className="flex justify-center gap-6 mb-8">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                 <a key={social} href={`https://${social}.com`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-amber-500 hover:text-white transition-all">
                    {/* Simplified SVG placeholder for cleanliness */}
                    <span className="capitalize text-xs">{social}</span> 
                 </a>
              ))}
            </div>
            <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} Arnab Adhikary. All rights reserved.</p>
          </footer>
        </div>
      </div>

      {/* ✅ SIDEBAR DRAWER (Left Side) */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        
        <aside className="menu p-0 w-80 min-h-full bg-white text-slate-800 border-r border-slate-200 flex flex-col">
           {/* Profile Header */}
           <div className="bg-slate-50 p-8 flex flex-col items-center border-b border-slate-200">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-amber-500 ring-offset-base-100 ring-offset-2">
                  {basic_detail_load ? (
                    <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                  ) : (
                    <img src={basic_details[0]?.prifile_url} alt="Profile" />
                  )}
                </div>
              </div>
              
              {basic_detail_load ? (
                 <div className="h-6 w-32 bg-slate-200 animate-pulse rounded"></div>
              ) : (
                 <>
                   <h2 className="text-xl font-bold">{basic_details[0]?.my_name}</h2>
                   <p className="text-amber-600 font-medium text-sm">{basic_details[0]?.profation}</p>
                 </>
              )}

              {/* Social Icons Mini */}
              <div className="flex gap-4 mt-4">
                 <button onClick={() => window.open(basic_details[0]?.github_link)} className="btn btn-circle btn-sm btn-ghost hover:bg-amber-100">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GH" className="w-6" />
                 </button>
                 <button onClick={() => window.open(basic_details[0]?.linkdin_link)} className="btn btn-circle btn-sm btn-ghost hover:bg-amber-100">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LI" className="w-6" />
                 </button>
              </div>
           </div>

           {/* Scrollable Content */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6">


            {/* Contact Info */}
              <div>
                 <h3 className="font-bold text-lg mb-4 border-l-4 border-amber-500 pl-2">Details</h3>
                 {basic_detail_load ? <span className="loading loading-dots"></span> : (
                    <div className="text-sm space-y-3">
                       <div className="flex flex-col">
                          <span className="text-xs text-slate-400 uppercase font-bold">Phone</span>
                          <span className="font-medium">{basic_details[0]?.pnone}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs text-slate-400 uppercase font-bold">Email</span>
                          <span className="font-medium truncate">{basic_details[0]?.email}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs text-slate-400 uppercase font-bold">Location</span>
                          <span className="font-medium">{basic_details[0]?.address}</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs text-slate-400 uppercase font-bold">DOB</span>
                          <span className="font-medium">{basic_details[0]?.date_of_barth}</span>
                       </div>
                    </div>
                 )}
              </div>

              {/* Languages */}
              <div className="bg-slate-900 text-amber-50 p-3 rounded-lg text-center text-sm font-semibold">
                 {basic_detail_load ? "..." : basic_details[0]?.language}
              </div>
              
              {/* Skills */}
              <div>
                 <h3 className="font-bold text-lg mb-4 border-l-4 border-amber-500 pl-2">Skills</h3>
                 {basic_detail_load ? <span className="loading loading-bars"></span> : (
                   <div className="space-y-3">
                      {basic_details[0]?.skills.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                           <div className="w-8 h-8 p-1 bg-slate-100 rounded flex items-center justify-center shrink-0">
                              <img src={item.icon_url} alt="" className="max-w-full max-h-full" />
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between text-xs mb-1">
                                 <span className="font-semibold">{item.skill_name}</span>
                                 <span>{item.confidance}%</span>
                              </div>
                              <progress className="progress progress-warning w-full h-2" value={item.confidance} max="100"></progress>
                           </div>
                        </div>
                      ))}
                      
                      {/* Add Skill Button */}
                      <button onClick={() => check_token('/add/skill')} className="btn btn-xs btn-outline w-full border-dashed border-slate-400 text-slate-500 mt-2">
                         + Add Skill
                      </button>
                   </div>
                 )}
              </div>

              <div className="divider"></div>

           </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
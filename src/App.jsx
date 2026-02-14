import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { RPProvider, RPDefaultLayout, RPPages, RPConfig } from '@pdf-viewer/react'
import backend_url from "./component/backend_url";
import { Plus, ExternalLink, GraduationCap } from 'lucide-react';

function App() {

  const navigate = useNavigate();
  const MainUrl = backend_url;

  const [basic_details, set_basic_details] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skill_details, set_skill_details] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (basic_details.length === 0) {
          const response_basic = await axios.get(MainUrl + '/basic/get');

          if (response_basic.data.data) {
            set_basic_details(response_basic.data.data);
            set_skill_details(response_basic.data.data[0]?.skills || []);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('API error:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [basic_details.length, MainUrl]);

  // Helper to safely access the first item
  const data = basic_details[0];

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
          <div className="relative w-full min-h-[700px] flex items-center bg-slate-950 text-white overflow-hidden">

            {/* Modern Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-600/20 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">

              {/* Left Content: Typography & CTA */}
              <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-2">
                  Available for Freelance & Full-time
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  I'm <span className="text-white">{loading ? "..." : data?.my_name}</span>
                  <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mt-2">
                    <div>{loading ? "..." : data?.profation}</div>
                  </span>
                </h1>

                <div className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                  <div>{loading ? "..." : data?.about_me}</div>
                </div>

                {/* Trust Badges / Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-800/50">
                  <div>
                    <div className="text-2xl font-bold text-white">{loading ? "..." : data?.exprience}+</div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest">Years Exp.</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{loading ? "..." : data?.project_count}+</div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest">Projects</p>
                  </div>
                </div>
              </div>

              {/* Right Content: PDF Viewer */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-[500px] group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                  <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Resume.pdf</span>
                    </div>

                    <div className="h-[500px] md:h-[600px] overflow-hidden rounded-b-xl">
                      <RPConfig>
                        <RPProvider src={data?.resume_url}>
                          <RPDefaultLayout>
                            <RPPages />
                          </RPDefaultLayout>
                        </RPProvider>
                      </RPConfig>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="container mx-auto px-4 md:px-8 space-y-24 mt-16">

            {/* EDUCATION SECTION  */}
            <section className="py-10 px-4 bg-slate-50">
              <div className="max-w-5xl mx-auto">

                <div className="text-center mb-12">
                  <h2 className="text-3xl font-extrabold text-slate-800 flex items-center justify-center gap-3">
                    <GraduationCap className="w-8 h-8 text-amber-500" />
                    Learning
                  </h2>
                  <p className="text-slate-500 mt-3 text-lg">My academic achievements, courses, and certifications</p>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-4 rounded-full"></div>
                </div>

                {loading ? (
                  <div className="flex justify-center p-12">
                    <span className="loading loading-bars loading-lg text-amber-600"></span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Education Cards */}
                    {data?.education?.map((item, index) => (
                      <div
                        key={index}
                        className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col md:flex-row gap-6"
                      >
                        <div className="shrink-0 w-full md:w-48 h-48 md:h-auto relative bg-slate-100 rounded-xl overflow-hidden border border-slate-100 cursor-pointer"
                          onClick={() => window.open(item.certificate_url, "_blank")}>
                          <img
                            src={item.certificate_url}
                            alt="Certificate"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <span className="flex items-center gap-2 text-white font-medium bg-white/20 px-4 py-2 rounded-full border border-white/30">
                              <ExternalLink size={16} /> View
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm md:text-base">
                            {item.discriotion}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Add New Button */}
                    <button
                      onClick={() => { navigate('/basic/edit') }}
                      className="w-full py-6 mt-4 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 group"
                    >
                      <div className="bg-slate-100 p-3 rounded-full mb-2 group-hover:bg-amber-100 transition-colors">
                        <Plus size={24} />
                      </div>
                      <span className="font-semibold text-lg">Add New Education</span>
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* PROJECT SECTION */}
            <section>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800">Projects</h2>
                <p className="text-slate-500 mt-2">A showcase of my recent work</p>
                <div className="h-1 w-20 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              </div>

              {loading ? (
                <div className="flex justify-center"><span className="loading loading-bars loading-lg text-amber-600"></span></div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
                  {data?.projects?.map((item, index) => (
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
                  <div onClick={() => {
                    navigate('/basic/edit');
                  }} className="card h-full min-h-[300px] border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-amber-500 transition-all group">
                    <div className="text-center">
                      <div className="text-4xl text-slate-300 group-hover:text-amber-500 mb-2">+</div>
                      <span className="font-semibold text-slate-400 group-hover:text-amber-600">Add Project</span>
                    </div>
                  </div>
                </div>
              )}
            </section>

          </div> {/* End Container */}

          {/* FOOTER */}
          <footer className="bg-slate-900 text-slate-300 py-12 px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">{loading ? "..." : data?.my_name}</h2>
            <span className=" m-2.5">{loading ? "..." : data?.email}</span>
            <div className="flex justify-center gap-6 mb-8">
              <a key={'GitHub'} href={data?.github_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-amber-500 hover:text-white transition-all">
                <span className="capitalize text-xs">GitHub</span>
              </a>

              <a key={'LinkedIn'} href={data?.linkdin_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-amber-500 hover:text-white transition-all">
                <span className="capitalize text-xs">LinkedIn</span>
              </a>
            </div>
            <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} {data?.my_name}. All rights reserved.</p>
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
                {loading ? (
                  <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                ) : (
                  <img src={data?.prifile_url} alt="Profile" />
                )}
              </div>
            </div>

            {loading ? (
              <div className="h-6 w-32 bg-slate-200 animate-pulse rounded"></div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{data?.my_name}</h2>
                <p className="text-amber-600 font-medium text-sm">{data?.profation}</p>
              </>
            )}

            {/* Social Icons Mini */}
            <div className="flex gap-4 mt-4">
              <button onClick={() => window.open(data?.github_link)} className="btn btn-circle btn-sm btn-ghost hover:bg-amber-100">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GH" className="w-6" />
              </button>
              <button onClick={() => window.open(data?.linkdin_link)} className="btn btn-circle btn-sm btn-ghost hover:bg-amber-100">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LI" className="w-6" />
              </button>
            </div>
            <button
              onClick={() => navigate('/basic/edit')}
              className="flex cursor-pointer mt-7 items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-indigo-200/50 transform active:scale-95 transition-all"
            >
              Edit Portfolio
            </button>
          </div>



          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4 border-l-4 border-amber-500 pl-2">Details</h3>
              {loading ? <span className="loading loading-dots"></span> : (
                <div className="text-sm space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Phone</span>
                    <span className="font-medium">{data?.pnone}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Email</span>
                    <span className="font-medium truncate">{data?.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Location</span>
                    <span className="font-medium">{data?.address}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">DOB</span>
                    <span className="font-medium">{data?.date_of_barth}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="bg-slate-900 text-amber-50 p-3 rounded-lg text-center text-sm font-semibold">
              {loading ? "..." : data?.language}
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-bold text-lg mb-4 border-l-4 border-amber-500 pl-2">Skills</h3>
              {loading ? <span className="loading loading-bars"></span> : (
                <div className="space-y-3">
                  {
                    skill_details.length > 0 ?
                      (
                        skill_details.map((item, index) => (
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
                        ))
                      )
                      :
                      (
                        <div>
                          No skills added yet...
                        </div>
                      )
                  }

                  {/* Add Skill Button */}
                  <button onClick={() => { navigate('/basic/edit') }} className="btn btn-xs btn-outline w-full border-dashed border-slate-400 text-slate-500 mt-2">
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
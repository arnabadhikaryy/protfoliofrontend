import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Document } from 'react-pdf';


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
        console.log("basic data response is", response_basic.data.data);

        const response_project = await axios.get(MainUrl+'/project/get');
        console.log("project data response is", response_project.data.data);

        const response_education = await axios.get(MainUrl+'/edu/get');
        console.log("education data response is", response_education.data.data);

        const response_service = await axios.get(MainUrl+'/service/get');
        console.log("service data response is", response_service.data.data);

        if (response_basic.data.data) {
          set_basic_details(response_basic.data.data);
          set_basic_detail_load(false);
          //console.log('profile url is ', basic_details[0].prifile_url)
        } 

        if (response_project.data.data) {
          set_project_details(response_project.data.data);
          set_project_details_load(false);
        }

        if (response_education.data.data) {
          set_education_details(response_education.data.data);
          set_education_details_load(false);
          //console.log(education_details)
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
    // Get all cookies and find the 'token'
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
    <div className="drawer lg:drawer-open text-black">
       <Toaster />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <label
        htmlFor="my-drawer-2"
        className="drawer-button fixed top-4 left-4 z-50 lg:hidden"
      >
        <img
          className="h-[1cm] m-1.5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png"
          alt="menu"
        />
      </label>
      <div className="drawer-content bg-amber-50 min-h-screen p-4">



        <div className="flex flex-col md:flex-row h-auto md:h-[9cm] items-center justify-between bg-[url('https://static.vecteezy.com/system/resources/thumbnails/033/351/258/small_2x/beautiful-bright-wallpaper-nature-background-ai-generated-photo.jpg')] bg-no-repeat bg-center bg-cover p-4">
          <div className="w-full md:w-1/2 mt-4 md:mt-8">
            <p className="font-bold text-2xl md:text-3xl">
              I'm Arnab Adhikary<br />
              <span className="text-amber-600">Full Stack</span> Web Developer & Programmer
            </p>
            <p className="mt-2 text-sm md:text-base">
            A highly motivated web developer with a passion for coding and creating dynamic, user-friendly websites. Proficient in modern frontend and backend technologies. Looking to leverage my skills in a professional setting to contribute to the development of innovative web solutions
            </p>
            <div className="flex justify-end mt-4">
              <button className="btn btn-neutral active:text-black active:bg-amber-50">Hire me</button>
            </div>
          </div>
          <div className="w-full h-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
             <object data=".src/assets/resume/arnab_cv_1edition.pdf" type="application/pdf" ></object>
          </div>
        </div>


        {/* EDUCATION SECTION */}
        <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
          <h1 className=" text-4xl font-bold">Education</h1>
          <p>Hare is my education achievment, courses and certificates</p>
        </div>

        <div>
          {/* Header row */}
          <div className="flex flex-col md:flex-row bg-blue-500 items-center justify-between m-2 p-2 gap-2 text-white">
            <div className="font-bold text-base md:text-xl">Title</div>
            <div className="font-bold text-base md:text-xl">Description</div>
            <div className="font-bold text-base md:text-xl">Certificate</div>
          </div>

          {/* Course 1 */}
         {education_details_load ? (<div className=" h-[3cm] flex items-center justify-center"> <span className="loading loading-bars loading-xl"></span> </div>):(<div>

          {education_details.map((item,index)=>(
             <div key={index} className="flex flex-col md:flex-row bg-blue-200 items-center justify-between m-2 p-2 gap-2 h-auto md:h-[4cm]">
             <div className="font-bold text-base md:text-xl">{item.title}</div>
             <div className="text-sm md:text-base text-center md:text-left">
               {item.discriotion}
             </div>
             <div className="h-[150px] w-full md:w-[4cm]">
               <img
               onClick={()=>{ window.open(item.certificate_url, "_blank"); }}
                 className="h-full w-full object-contain cursor-pointer"
                 src={item.certificate_url}
                 alt=""
               />
             </div>
           </div>
          ))}

         </div>)}


          {/* Add More Button */}
          <div onClick={()=>{check_token('/upload/servide')}} className="flex bg-black text-amber-50 items-center justify-center m-2 hover:text-black hover:bg-amber-200 cursor-pointer active:bg-black active:text-amber-50 p-2">
            <div className="font-bold text-base md:text-xl">Add More +</div>
          </div>



        </div>



        {/* Project SECTION */}
        <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
          <h1 className=" text-4xl font-bold">Projects</h1>
          <p>Hare is some projects.</p>
        </div>

        {/* project cards in the billoe div */}
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {/* Card 1 */}

          { project_details_load ? (<span className="loading loading-bars loading-xl"></span>) : (
                project_details.map((item,index)=>(
                  <div key={index} className="card bg-base-100 w-full sm:w-60 shadow-sm">
                  <figure>
                    <img
                      src={item.project_snap_url}
                      alt="Project"
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.discriotion}</p>
                    <div className="card-actions justify-end">
                      <button onClick={()=>{window.open(item.project_link, "_blank");}} className="btn btn-primary">see project</button>
                    </div>
                  </div>
                </div>
                ))
          ) }
          
         
        </div>

        {/* Add More Button */}
        <div onClick={()=>{check_token('/upload/project')}} className="flex bg-black text-amber-50 items-center justify-center m-4 p-3 hover:text-black hover:bg-amber-200 cursor-pointer active:bg-black active:text-amber-50 rounded-md">
          <div className="font-bold text-base sm:text-xl">Add More Projects +</div>
        </div>




        {/* service SECTION */}
        <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
          <h1 className=" text-4xl font-bold">Service</h1>
          <p></p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-4">

{/* Reusable Card */}
{service_details_load ? (<div className=" flex m-7"> <span className="loading loading-bars loading-xl bg-amber-950"></span> </div>) : (
  service_details.map((item, i) => (
    <div
      key={i}
      className="bg-amber-100 h-[8cm] w-[6.5cm] flex flex-col items-center rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
    >
      <div className="h-[3cm] w-[3cm] mb-2">
        <img
          src={item.icon_url}
          alt="Service Icon"
          className="object-contain w-full h-full"
        />
      </div>
      <h1 className="font-bold text-xl text-center text-gray-800 mb-1">{item.title}</h1>
      <p className="text-center text-gray-600 text-sm mb-1 px-2">
        {item.discriotion}
      </p>
      <p className="text-gray-700 text-sm mb-3 font-semibold">Price: ₹{item.price}</p>
      <button className="btn btn-neutral btn-sm">Contact for Free</button>
    </div>
  ))
)}

{/* Add New Skeleton Card */}
<div  onClick={()=>{check_token('/upload/servide')}} className="bg-amber-50 h-[8cm] w-[6.5cm] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-amber-300 hover:bg-amber-100 cursor-pointer transition-all shadow-inner">
  <div className="h-[3cm] w-[3cm] opacity-40 mb-2">
    <img
      src="https://cdn-icons-png.flaticon.com/512/992/992651.png"
      alt="Add More"
      className="w-full h-full object-contain"
    />
  </div>
  <h1 className="font-bold text-xl text-amber-400 mb-1">Add New Service</h1>
  <p className="text-center text-gray-500 text-sm mb-3 px-3">Click to create a new service card</p>
  <button className="btn btn-outline btn-sm">+ Add New</button>
</div>

</div>



        {/* contect SECTION */}
        <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
          <h1 className=" text-4xl font-bold">Contect</h1>
          <p></p>
        </div>

        <div className=" flex flex-col items-center">

          <input type="text" placeholder="your name" className="input input-neutral m-2" />

          <label className="input validator m-2">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          <input type="text" placeholder="discription" className="input input-xl" />

          <button className="btn btn-neutral m-2"> contect now </button>
        </div>


        {/* futter section */}
        <footer className="bg-[#0c1124] text-white py-10 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">arnab adhikary</h1>

          <div className="flex justify-center gap-8 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.87v-6.99H8v-2.88h2.4V9.41c0-2.4 1.43-3.74 3.63-3.74 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.52v1.83H17l-.38 2.88h-2.45v6.99A10 10 0 0 0 22 12z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.25 2.42.42.49.185.84.41 1.21.78.37.37.595.72.78 1.21.17.45.364 1.25.42 2.42.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.25 1.97-.42 2.42-.185.49-.41.84-.78 1.21-.37.37-.72.595-1.21.78-.45.17-1.25.364-2.42.42-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.25-2.42-.42a3.4 3.4 0 0 1-1.21-.78 3.4 3.4 0 0 1-.78-1.21c-.17-.45-.364-1.25-.42-2.42C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.25-1.97.42-2.42.185-.49.41-.84.78-1.21a3.4 3.4 0 0 1 1.21-.78c.45-.17 1.25-.364 2.42-.42C8.416 2.212 8.8 2.2 12 2.2Zm0 1.8c-3.144 0-3.513.012-4.747.068-.99.045-1.527.207-1.88.345-.45.18-.77.39-1.11.73-.34.34-.55.66-.73 1.11-.138.353-.3.89-.345 1.88C3.812 9.487 3.8 9.856 3.8 13s.012 3.513.068 4.747c.045.99.207 1.527.345 1.88.18.45.39.77.73 1.11.34.34.66.55 1.11.73.353.138.89.3 1.88.345C8.487 20.188 8.856 20.2 12 20.2s3.513-.012 4.747-.068c.99-.045 1.527-.207 1.88-.345.45-.18.77-.39 1.11-.73.34-.34.55-.66.73-1.11.138-.353.3-.89.345-1.88.056-1.234.068-1.603.068-4.747s-.012-3.513-.068-4.747c-.045-.99-.207-1.527-.345-1.88a3.4 3.4 0 0 0-.73-1.11 3.4 3.4 0 0 0-1.11-.73c-.353-.138-.89-.3-1.88-.345C15.513 4.012 15.144 4 12 4Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.6-1.26a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z" /></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M22.46 6.011c-.793.352-1.644.59-2.538.696a4.392 4.392 0 0 0 1.924-2.422 8.775 8.775 0 0 1-2.782 1.06 4.381 4.381 0 0 0-7.466 3.993A12.436 12.436 0 0 1 3.15 4.766a4.381 4.381 0 0 0 1.355 5.843 4.36 4.36 0 0 1-1.983-.547v.055a4.382 4.382 0 0 0 3.514 4.294 4.39 4.39 0 0 1-1.979.075 4.383 4.383 0 0 0 4.089 3.04A8.791 8.791 0 0 1 2 19.549a12.384 12.384 0 0 0 6.713 1.967c8.048 0 12.458-6.666 12.458-12.458 0-.19-.005-.38-.013-.568a8.895 8.895 0 0 0 2.203-2.264l.001-.003Z" /></svg>
            </a>
          </div>

          <p className="text-sm">&copy; Bedimcode. All rights reserved</p>
        </footer>


      </div>

      {/* ✅ Sidebar Drawer */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 min-h-full bg-emerald-200 text-base-content">
          <div className=" flex flex-col items-center justify-center h-full text-black space-y-3 lg:sticky">
            <div className="avatar">
              <div className="w-24 rounded-full">
                {basic_detail_load ? (
                  <span className="loading loading-ring loading-xl mt-4 ml-4"></span>
                ) : (
                  <img src={basic_details[0].prifile_url} alt="Profile" />
                )}
              </div>
            </div>
            {basic_detail_load ? (<span className="loading loading-dots loading-xl"></span>) : (<div className="text-2xl font-semibold">{basic_details[0].my_name}</div>)}
            {basic_detail_load ? (<span className="loading loading-dots loading-xl"></span>) : (<div className=" mt-[-0.4cm]">{basic_details[0].profation}</div>)}

            {/* socalmidia icons */} 
            <div className=" flex">

              <div className="avatar mx-8" onClick={() => {
                window.open(basic_details[0].github_link, '_blank');
              }}>
                <div className="w-[1.5cm] h-[1.4cm] rounded-full cursor-pointer bg-amber-500">
                  <img src="https://w7.pngwing.com/pngs/646/324/png-transparent-github-computer-icons-github-logo-monochrome-head-thumbnail.png" />
                </div>
              </div>

              <div className="avatar mx-8" onClick={() => {
                window.open(basic_details[0].linkdin_link, '_blank');
              }}>
                <div className="w-[1.5cm] h-[1.4cm] rounded-full cursor-pointer bg-amber-500">
                  <img src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" />
                </div>
              </div>

            </div>

                        {/* slowing skills */}
            <hr className=" h-2.5 w-[7cm]" />

            <h1 className=" font-bold text-2xl">Skills</h1>

            {basic_detail_load ? (<span className="loading loading-bars loading-xl"></span>) :

              <div>

                {
                  basic_details[0].skills.map((item, index) => (
                    <div className="flex ml-[-1cm]" key={index}>
                      <div className="h-[1cm] w-[1cm]  rounded-sm flex items-center justify-center mt-1.5">
                        <img
                          src={item.icon_url}
                          alt=""
                        />
                      </div>

                      <div className="bg-blue-200 rounded-sm m-1 w-[6.7cm]">
                        <div className="flex justify-between px-2">
                          <h1>{item.skill_name}</h1>
                          <p>{item.confidance}</p>
                        </div>

                        <div className=" ml-2.5">
                          <progress className="progress progress-neutral w-56" value={item.confidance} max="100"></progress>
                        </div>
                      </div>
                    </div>
                  ))
                }

                <div className="flex ml-[-1cm]">
                  <div className="h-[1cm] w-[1cm]  rounded-sm flex items-center justify-center mt-1.5">
                    <img
                      src='https://png.pngtree.com/png-clipart/20190520/original/pngtree-question-mark-vector-icon-png-image_4017381.jpg'
                      alt=""
                    />
                  </div>

                  <div onClick={()=>{check_token('/add/skill')}} className=" cursor-pointer bg-blue-200 rounded-sm m-1 w-[6.7cm]">
                    <div className="flex justify-center px-2">
                      <button className=" bg-amber-600 mt-0.5 rounded-sm w-[3cm] font-bold text-amber-50 cursor-pointer hover:bg-amber-900 active:bg-amber-500">add more +</button>
                    </div>

                    <div className=" ml-2.5">
                      <progress className="progress w-56"></progress>
                    </div>
                  </div>
                </div>




              </div>
            }

            <hr className=" h-2.5 w-[7cm]" />

            {/* age and address */}

            {basic_detail_load ? (<span className="loading loading-infinity loading-xl"></span>) :
              <div className="">

                <div className=" flex m-3.5">
                  <div className="bg-amber-600 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center text-white mx-8">D.O.B</div>
                  <p className="mx-8 w-[2.3cm] h-[0.7cm] rounded-sm flex items-center justify-center font-bold ">{basic_details[0].date_of_barth}</p>
                </div>

                <div className=" flex m-3.5">
                  <div className="bg-amber-600 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center text-white mx-8">PHONE</div>
                  <p className="mx-8 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center ">{basic_details[0].pnone}</p>
                </div>

                <div className=" flex m-3.5">
                  <div className="bg-amber-600 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center text-white mx-8">Email</div>
                  <p className="mx-8 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center">{basic_details[0].email}</p>
                </div>

                <div className=" flex m-3.5">
                  <div className="bg-amber-600 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center text-white mx-8">Address</div>
                  <p className="mx-8 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center ">{basic_details[0].address}</p>
                </div>

              </div>}


            <hr className=" h-2.5 w-[7cm]" />

            {/* showing language */}
            <h1 className=" font-bold text-2xl">Languages</h1>
            {basic_detail_load ? (<span className="loading loading-spinner text-success"></span>) :
              <div>
                <div className=" bg-black font-bold text-amber-50 h-[0.8cm] w-[7cm] flex items-center justify-center rounded-md">
                  {basic_details[0].language}
                </div>
              </div>
            }


          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;




function arnab(){



    returncode



    return (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content bg-amber-50 h-screen">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className=" drawer-button fixed lg:hidden ">
              <img
                className="h-[1cm] m-1.5"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/640px-Hamburger_icon.svg.png"
                alt=""
              />
            </label>
    
            {/* DISCRIPTION AND IMAGE PART */}
    
            <div className="flex h-[9cm] items-center justify-between bg-[url('https://static.vecteezy.com/system/resources/thumbnails/033/351/258/small_2x/beautiful-bright-wallpaper-nature-background-ai-generated-photo.jpg')] bg-no-repeat bg-center bg-cover">
              <div className=" m-2 w-1/2 mt-8">
                <p className="font-bold text-3xl ">I'm Arnab Adhikary<br /> <span className=" text-amber-600">Full Stack</span> Web Developer</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ut est assumenda, nulla eaque minus blanditiis maxime, molestiae culpa velit voluptas fuga. Doloribus corporis explicabo inventore neque ipsum necessitatibus adipisci nam dolor.</p>
                <div className=" flex justify-end m-1">
                  <button className="btn btn-neutral active:text-black active:bg-amber-50 ">Hire me  </button>
                </div>
              </div>
              <div className=" h-[5cm]  w-1/2 flex justify-center">
                <img className=" bg-none" src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8yN19yZWFsaXN0aWNfcGhvdG9fb2Zfc21pbGluZ19oYW5kc29tZV95b3VuZ19pbl8xNWExMTE1ZC0xZTBiLTQ4YjAtOGEyNi01ZDE1ZmE3Njg2MzYucG5n.png" alt="" />
              </div>
            </div>
    
            {/* EDUCATION SECTION */}
            <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
              <h1 className=" text-4xl font-bold">Education</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit perspiciatis ex iure alias, dolor id!</p>
            </div>
    
            <div>
              <div className="flex bg-blue-500 items-center justify-between m-2">
                <div className=" m-2 font-bold text-xl">Title</div>
                <div className="m-2 font-bold text-xl"> discription</div>
                <div className="m-2 font-bold text-xl">certifecate</div>
              </div>
              {/* array maping for educations */}
              <div className="flex bg-blue-200 items-center justify-between m-2 h-[4cm]">
                <div className=" m-2 font-bold text-xl">Javascript course</div>
                <div className="m-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, facilis.</div>
                <div className="m-2 h-[2cm] w-[4cm]">
                  <img src="https://m.media-amazon.com/images/I/71rf-yB92VL._AC_UF1000,1000_QL80_.jpg" alt="" />
                </div>
              </div>
    
              <div className="flex bg-blue-200 items-center justify-between m-2 h-[4cm]">
                <div className=" m-2 font-bold text-xl">Javascript course</div>
                <div className="m-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, facilis.</div>
                <div className="m-2 h-[2cm] w-[4cm]">
                  <img src="https://m.media-amazon.com/images/I/71rf-yB92VL._AC_UF1000,1000_QL80_.jpg" alt="" />
                </div>
              </div>
    
              {/* add more course buttom */}
    
              <div className="flex bg-black text-amber-50 items-center justify-center m-2 hover:text-black hover:bg-amber-200 cursor-pointer active:bg-black active:text-amber-50">
                <div className="m-2 font-bold text-xl"> Add More +</div>
              </div>
    
            </div>
    
    
            {/* Project SECTION */}
            <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
              <h1 className=" text-4xl font-bold">Projects</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit perspiciatis ex iure alias, dolor id!</p>
            </div>
    
            {/* project cards in the billoe div */}
            <div className="flex flex-wrap">
    
              <div className="card bg-base-100 w-60  shadow-sm m-3">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Card Title</h2>
                  <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
    
              <div className="card bg-base-100 w-60  shadow-sm m-3">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Card Title</h2>
                  <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
    
              <div className="card bg-base-100 w-60  shadow-sm m-3">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Card Title</h2>
                  <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
    
            </div>
            <div className="flex bg-black text-amber-50 items-center justify-center m-2 hover:text-black hover:bg-amber-200 cursor-pointer active:bg-black active:text-amber-50">
                <div className="m-2 font-bold text-xl"> Add More project +</div>
              </div>
    
    
    
            {/* service SECTION */}
            <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
              <h1 className=" text-4xl font-bold">Service</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit perspiciatis ex iure alias, dolor id!</p>
            </div>
    
            <div className=" flex flex-wrap">
    
              <div className="bg-amber-100  h-[8cm] w-[6.5cm] flex flex-col justify-center items-center rounded-md m-2.5 flex-wrap">
                <div className=" h-[3cm] w-[3cm]">
                <img src="https://cdn-icons-png.flaticon.com/512/11096/11096817.png" alt="" />
                </div>
                <h1 className=" font-bold text-xl">Web devlopment</h1>
                <p className=" m-1.5">compleat full stack responsiv web site making. hosting is free</p>
                <p className=" mb-1.5">price: 99</p>
                <button className="btn btn-neutral">Contect for free</button>
              </div>
    
             
              <div className="bg-amber-100  h-[8cm] w-[6.5cm] flex flex-col justify-center items-center rounded-md m-2.5 flex-wrap">
                <div className=" h-[3cm] w-[3cm]">
                <img src="https://cdn-icons-png.flaticon.com/512/11096/11096817.png" alt="" />
                </div>
                <h1 className=" font-bold text-xl">Web devlopment</h1>
                <p className=" m-1.5">compleat full stack responsiv web site making. hosting is free</p>
                <p className=" mb-1.5">price: 99</p>
                <button className="btn btn-neutral">Contect for free</button>
              </div>
    
             
              <div className="bg-amber-100  h-[8cm] w-[6.5cm] flex flex-col justify-center items-center rounded-md m-2.5 flex-wrap">
                <div className=" h-[3cm] w-[3cm]">
                <img src="https://cdn-icons-png.flaticon.com/512/11096/11096817.png" alt="" />
                </div>
                <h1 className=" font-bold text-xl">Web devlopment</h1>
                <p className=" m-1.5">compleat full stack responsiv web site making. hosting is free</p>
                <p className=" mb-1.5">price: 99</p>
                <button className="btn btn-neutral">Contect for free</button>
              </div>
    
            </div>
    
    
    
             {/* contect SECTION */}
             <div className=" flex flex-col items-center m-2 mt-7 mb-[2cm]">
              <h1 className=" text-4xl font-bold">Contect</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit perspiciatis ex iure alias, dolor id!</p>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.6 9.87v-6.99H8v-2.88h2.4V9.41c0-2.4 1.43-3.74 3.63-3.74 1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.2 0-1.57.75-1.57 1.52v1.83H17l-.38 2.88h-2.45v6.99A10 10 0 0 0 22 12z"/></svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.25 2.42.42.49.185.84.41 1.21.78.37.37.595.72.78 1.21.17.45.364 1.25.42 2.42.058 1.267.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.25 1.97-.42 2.42-.185.49-.41.84-.78 1.21-.37.37-.72.595-1.21.78-.45.17-1.25.364-2.42.42-1.267.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.25-2.42-.42a3.4 3.4 0 0 1-1.21-.78 3.4 3.4 0 0 1-.78-1.21c-.17-.45-.364-1.25-.42-2.42C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.25-1.97.42-2.42.185-.49.41-.84.78-1.21a3.4 3.4 0 0 1 1.21-.78c.45-.17 1.25-.364 2.42-.42C8.416 2.212 8.8 2.2 12 2.2Zm0 1.8c-3.144 0-3.513.012-4.747.068-.99.045-1.527.207-1.88.345-.45.18-.77.39-1.11.73-.34.34-.55.66-.73 1.11-.138.353-.3.89-.345 1.88C3.812 9.487 3.8 9.856 3.8 13s.012 3.513.068 4.747c.045.99.207 1.527.345 1.88.18.45.39.77.73 1.11.34.34.66.55 1.11.73.353.138.89.3 1.88.345C8.487 20.188 8.856 20.2 12 20.2s3.513-.012 4.747-.068c.99-.045 1.527-.207 1.88-.345.45-.18.77-.39 1.11-.73.34-.34.55-.66.73-1.11.138-.353.3-.89.345-1.88.056-1.234.068-1.603.068-4.747s-.012-3.513-.068-4.747c-.045-.99-.207-1.527-.345-1.88a3.4 3.4 0 0 0-.73-1.11 3.4 3.4 0 0 0-1.11-.73c-.353-.138-.89-.3-1.88-.345C15.513 4.012 15.144 4 12 4Zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.6-1.26a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="white" viewBox="0 0 24 24"><path d="M22.46 6.011c-.793.352-1.644.59-2.538.696a4.392 4.392 0 0 0 1.924-2.422 8.775 8.775 0 0 1-2.782 1.06 4.381 4.381 0 0 0-7.466 3.993A12.436 12.436 0 0 1 3.15 4.766a4.381 4.381 0 0 0 1.355 5.843 4.36 4.36 0 0 1-1.983-.547v.055a4.382 4.382 0 0 0 3.514 4.294 4.39 4.39 0 0 1-1.979.075 4.383 4.383 0 0 0 4.089 3.04A8.791 8.791 0 0 1 2 19.549a12.384 12.384 0 0 0 6.713 1.967c8.048 0 12.458-6.666 12.458-12.458 0-.19-.005-.38-.013-.568a8.895 8.895 0 0 0 2.203-2.264l.001-.003Z"/></svg>
        </a>
      </div>
    
      <p className="text-sm">&copy; Bedimcode. All rights reserved</p>
    </footer>
    
    
    
    
    
            {/* page contend end hare */}
    
    
          </div>
          <div className="drawer-side ">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
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
    
                <hr className=" h-2.5 w-[7cm]" />
    
                {/* age and address */}
    
                {basic_detail_load ? (<span className="loading loading-infinity loading-xl"></span>) :
                  <div className="">
    
                    <div className=" flex m-3.5">
                      <div className="bg-amber-600 w-[2cm] h-[0.7cm] rounded-sm flex items-center justify-center text-white mx-8">D.O.B</div>
                      <p className="mx-8 w-[2.3cm] h-[0.7cm] rounded-sm flex items-center justify-center font-bold ">{basic_details[0].date_of_barth}</p>
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
    
                      <div className="bg-blue-200 rounded-sm m-1 w-[6.7cm]">
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
    
    
              </div>
            </ul>
          </div>
        </div>
    
      );
    
}
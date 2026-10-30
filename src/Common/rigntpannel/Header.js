import React, { useState } from "react";
// import "../output.css";

const Header = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const handleShow = (e) => {
    setProfileDropdown(!profileDropdown);
  };
  
 
  return (
    <>
      <div className="rightside">
        <div class="bg-cyan-600 p-3 position-relative z-3 ps-0">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <h1 class="text-white text-lg font-semibold ms-5">CMSEzee</h1>
            </div>
            <div class="flex items-center gap-3">
              <a href="/#" className="flex gap-2 items-center text-white visit-site">
                <i className="fa fa-home"></i>
                Visit Site
              </a>
              <div class="relative group pe-4 dropdown">
                <i
                  className="fa fa-user w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center for-profile cursor-pointer"
                  onClick={(e) => handleShow(e)}
                ></i>
                <ul
                  className={`top-11 w-[230px] !py-0 font-semibold text-dark ltr:right-0 rtl:left-0 dark:text-white-dark dark:text-white-light/90 ${
                    profileDropdown ? "dropdown-open" : ""
                  }`}
                >
                  <li>
                    <div className="flex items-center p-2">
                      <div className="flex-none">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src="https://html.vristo.sbthemes.com/assets/images/user-profile.jpeg"
                          alt="image"
                        />
                      </div>
                      <div className="truncate ltr:pl-4 rtl:pr-4 ps-3 leading-none overflow-visible">
                        <h4 className="text-base">
                          John Doe
                          <span className="rounded bg-green-300 px-1 py-1 font-normal	 ms-2 text-xs text-success ltr:ml-2 rtl:ml-2">
                            Admin
                          </span>
                        </h4>
                        <a
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                          href="javascript:;"
                        >
                          johndoe@gmail.com
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#" className="dark:hover:text-white">
                      <svg
                        className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx={12}
                          cy={6}
                          r={4}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dark:hover:text-white">
                      <svg
                        className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Inbox
                    </a>
                  </li>
                  <li className="border-t border-white-light dark:border-white-light/10">
                    <a href="#" className="!py-3 text-danger">
                      <svg
                        className="h-4.5 w-4.5 rotate-90 ltr:mr-2 rtl:ml-2"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

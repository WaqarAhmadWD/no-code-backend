import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toggable } from '../../utils/toggable';
import { useLocation } from "react-router-dom";


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const modules = JSON.parse(localStorage.getItem("modules") || `[]`);
  const roles = JSON.parse(localStorage.getItem("roles") || `[]`);
  const isAdmin = !!roles?.find(e => e?.name === "super_admin");
  const location = useLocation();
  const permissions = (name) => {
    if(typeof name == "string"){
      return isAdmin || (!!modules?.find(e => e?.name == name))
    }else
    if(Array.isArray(name)){
      return isAdmin || !!modules?.find(module => name?.some(n => n === module?.name));
    }else{
      return isAdmin;
    }
  }
  const [sidebarExpanded, setSidebarExpanded] = useState(localStorage.getItem("sidebar-expanded") === "true");

  const sidebar = useRef(null);
  const trigger = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (
        sidebar.current && // Ensure the sidebar ref is assigned
        trigger.current && // Ensure the trigger ref is assigned
        !sidebar.current.contains(event.target) && // Click is outside the sidebar
        !trigger.current.contains(event.target) // Click is outside the trigger
      ) {
        setSidebarOpen(false); // Close the sidebar
      }
    };

    document.addEventListener("mousedown", clickHandler); // Use "mousedown" for better response
    return () => document.removeEventListener("mousedown", clickHandler);
  }, [sidebarOpen]);

  // Store `sidebarExpanded` state in localStorage
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded");
    } else {
      document.body.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);




  return (
    <div className="sidebar min-h-fit overflow-y-scroll  ">
      {/* Mobile Sidebar Trigger Button */}

      {/* Sidebar */}
      <div
        ref={sidebar}
        className={`bg-white fixed top-0 left-0 h-[100%] overflow-y-scroll md:h-full transition-all duration-300 
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}  // Mobile slide-in effect
    lg:relative lg:translate-x-0`}
        style={{
          zIndex: 9999,
          width: sidebarExpanded ? '230px' : '96px',
        }}
      >
        <div className="flex flex-row items-end justify-end lg:block p-2 md:p-0">
          {/* Mobile Close Button */}
          <div className="text-right">
            <button
              className="h-[20px] w-[23px] text-[12px] lg:hidden bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-full  flex items-center justify-center shadow-md"
              onClick={() => setSidebarOpen(false)} // Close the sidebar on click
            >
              ✕
            </button>
          </div>

          {/* Expand/Collapse Sidebar */}
          <div className="text-end hidden lg:block">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="text-white p-1"
            >
              <svg width="25" height="23" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.12549 8.75H14.3755C14.707 8.75 15.025 8.8817 15.2594 9.11612C15.4938 9.35054 15.6255 9.66848 15.6255 10C15.6255 10.3315 15.4938 10.6495 15.2594 10.8839C15.025 11.1183 14.707 11.25 14.3755 11.25H8.12549C7.79397 11.25 7.47603 11.1183 7.2416 10.8839C7.00718 10.6495 6.87549 10.3315 6.87549 10C6.87549 9.66848 7.00718 9.35054 7.2416 9.11612C7.47603 8.8817 7.79397 8.75 8.12549 8.75ZM16.8755 18.75H23.1255C23.457 18.75 23.775 18.8817 24.0094 19.1161C24.2438 19.3505 24.3755 19.6685 24.3755 20C24.3755 20.3315 24.2438 20.6495 24.0094 20.8839C23.775 21.1183 23.457 21.25 23.1255 21.25H16.8755C16.544 21.25 16.226 21.1183 15.9916 20.8839C15.7572 20.6495 15.6255 20.3315 15.6255 20C15.6255 19.6685 15.7572 19.3505 15.9916 19.1161C16.226 18.8817 16.544 18.75 16.8755 18.75ZM8.12549 13.75H23.1255C23.457 13.75 23.775 13.8817 24.0094 14.1161C24.2438 14.3505 24.3755 14.6685 24.3755 15C24.3755 15.3315 24.2438 15.6495 24.0094 15.8839C23.775 16.1183 23.457 16.25 23.1255 16.25H8.12549C7.79397 16.25 7.47603 16.1183 7.2416 15.8839C7.00718 15.6495 6.87549 15.3315 6.87549 15C6.87549 14.6685 7.00718 14.3505 7.2416 14.1161C7.47603 13.8817 7.79397 13.75 8.12549 13.75Z" fill="#1D3C6A" />
              </svg>

            </button>
          </div>


        </div>

        <div className="sitelogo-outer max-w-[170px] h-auto mx-auto">
          <Link
            to="/">
            {/* <img className="mx-auto" src="/images/site-logo.svg" alt="Site Logo" /> */}

          </Link>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="text-white mt-4">
          <li className={`mx-4 rounded-md ${location?.pathname === "/" ? "active" : ""}`}>
            <Link
              to="/"
              className="flex items-center gap-x-4 px-4 py-2.5">
              <svg
                className={`fill-current  w-3.5 h-3.5 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`}
                viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Icon-Set-Filled" transform="translate(-104.000000, -935.000000)" fill="#4A90E2">
                    <path d="M128,935 L124,935 C121.791,935 120,936.791 120,939 L120,943 C120,945.209 121.791,947 124,947 L128,947 C130.209,947 132,945.209 132,943 L132,939 C132,936.791 130.209,935 128,935 L128,935 Z M128,951 L124,951 C121.791,951 120,952.791 120,955 L120,959 C120,961.209 121.791,963 124,963 L128,963 C130.209,963 132,961.209 132,959 L132,955 C132,952.791 130.209,951 128,951 L128,951 Z M112,951 L108,951 C105.791,951 104,952.791 104,955 L104,959 C104,961.209 105.791,963 108,963 L112,963 C114.209,963 116,961.209 116,959 L116,955 C116,952.791 114.209,951 112,951 L112,951 Z M112,935 L108,935 C105.791,935 104,936.791 104,939 L104,943 C104,945.209 105.791,947 108,947 L112,947 C114.209,947 116,945.209 116,943 L116,939 C116,936.791 114.209,935 112,935 L112,935 Z" />
                  </g>
                </g>

              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Dashboard</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default Sidebar;

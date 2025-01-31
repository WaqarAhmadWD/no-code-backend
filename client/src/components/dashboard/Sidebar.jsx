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
            <img className="mx-auto" src="/images/site-logo.svg" alt="Site Logo" />

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
          {permissions("role") &&  <li className={`mx-4  ${location?.pathname === "/role" ? "active rounded-md" : ""}`}>
            <Link
              to="/role"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`w-3.5 h-3.5 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.51904 5.15625C3.51904 4.5653 3.63544 3.98014 3.86159 3.43417C4.08773 2.88821 4.4192 2.39213 4.83706 1.97427C5.25493 1.55641 5.751 1.22494 6.29697 0.998792C6.84293 0.772646 7.42809 0.65625 8.01904 0.65625C8.60999 0.65625 9.19515 0.772646 9.74112 0.998792C10.2871 1.22494 10.7832 1.55641 11.201 1.97427C11.6189 2.39213 11.9504 2.88821 12.1765 3.43417C12.4026 3.98014 12.519 4.5653 12.519 5.15625C12.519 6.34972 12.0449 7.49432 11.201 8.33823C10.3571 9.18214 9.21252 9.65625 8.01904 9.65625C6.82557 9.65625 5.68098 9.18214 4.83706 8.33823C3.99315 7.49432 3.51904 6.34972 3.51904 5.15625ZM18.519 3.65625H14.019V2.15625H18.519V3.65625ZM18.519 6.65625H14.019V5.15625H18.519V6.65625ZM18.519 9.65625H14.019V8.15625H18.519V9.65625ZM0.519043 18.6562V17.9062C0.519043 16.116 1.2302 14.3991 2.49607 13.1333C3.76194 11.8674 5.47883 11.1562 7.26904 11.1562H8.76904C10.5593 11.1562 12.2761 11.8674 13.542 13.1333C14.8079 14.3991 15.519 16.116 15.519 17.9062V18.6562H0.519043Z" fill="rgba(74, 144, 226, 1)" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Roles
              </span>}
            </Link>
          </li>}
          {permissions("assign_roles_module")  && <li className={`mx-4  ${location?.pathname === "/permissions"?"active rounded-md":""}`}>
            <Link
              to="/permissions"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`w-3.5 h-3.5 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.51904 5.15625C3.51904 4.5653 3.63544 3.98014 3.86159 3.43417C4.08773 2.88821 4.4192 2.39213 4.83706 1.97427C5.25493 1.55641 5.751 1.22494 6.29697 0.998792C6.84293 0.772646 7.42809 0.65625 8.01904 0.65625C8.60999 0.65625 9.19515 0.772646 9.74112 0.998792C10.2871 1.22494 10.7832 1.55641 11.201 1.97427C11.6189 2.39213 11.9504 2.88821 12.1765 3.43417C12.4026 3.98014 12.519 4.5653 12.519 5.15625C12.519 6.34972 12.0449 7.49432 11.201 8.33823C10.3571 9.18214 9.21252 9.65625 8.01904 9.65625C6.82557 9.65625 5.68098 9.18214 4.83706 8.33823C3.99315 7.49432 3.51904 6.34972 3.51904 5.15625ZM18.519 3.65625H14.019V2.15625H18.519V3.65625ZM18.519 6.65625H14.019V5.15625H18.519V6.65625ZM18.519 9.65625H14.019V8.15625H18.519V9.65625ZM0.519043 18.6562V17.9062C0.519043 16.116 1.2302 14.3991 2.49607 13.1333C3.76194 11.8674 5.47883 11.1562 7.26904 11.1562H8.76904C10.5593 11.1562 12.2761 11.8674 13.542 13.1333C14.8079 14.3991 15.519 16.116 15.519 17.9062V18.6562H0.519043Z" fill="rgba(74, 144, 226, 1)" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Role Permissions
              </span>}
            </Link>
          </li>}
     
         
         
          {permissions("user")  && <li className={`mx-4  ${location?.pathname === "/manage"?"active rounded-md":""}`}>
            <Link
              to="/manage"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.1562C12.2091 12.1562 14 10.3654 14 8.15625C14 5.94711 12.2091 4.15625 10 4.15625C7.79086 4.15625 6 5.94711 6 8.15625C6 10.3654 7.79086 12.1562 10 12.1562Z" fill="#4A90E2" />
                <path d="M10.67 13.1763C10.45 13.1663 10.23 13.1562 10 13.1562C7.58 13.1562 5.32 13.8262 3.39 14.9762C2.51 15.4962 2 16.4763 2 17.5063V20.1562H11.26C10.5534 19.1488 10.1265 17.972 10.0229 16.7459C9.91924 15.5197 10.1425 14.288 10.67 13.1763ZM20.75 16.1562C20.75 15.9363 20.72 15.7362 20.69 15.5262L21.83 14.5162L20.83 12.7863L19.38 13.2762C19.06 13.0062 18.7 12.7962 18.3 12.6462L18 11.1562H16L15.7 12.6462C15.3 12.7962 14.94 13.0062 14.62 13.2762L13.17 12.7863L12.17 14.5162L13.31 15.5262C13.28 15.7362 13.25 15.9363 13.25 16.1562C13.25 16.3762 13.28 16.5762 13.31 16.7862L12.17 17.7962L13.17 19.5263L14.62 19.0362C14.94 19.3062 15.3 19.5163 15.7 19.6663L16 21.1562H18L18.3 19.6663C18.7 19.5163 19.06 19.3062 19.38 19.0362L20.83 19.5263L21.83 17.7962L20.69 16.7862C20.72 16.5762 20.75 16.3762 20.75 16.1562ZM17 18.1562C15.9 18.1562 15 17.2562 15 16.1562C15 15.0563 15.9 14.1562 17 14.1562C18.1 14.1562 19 15.0563 19 16.1562C19 17.2562 18.1 18.1562 17 18.1562Z" fill="#4A90E2" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">User Management

              </span>}
            </Link>
          </li>}
       
          {permissions("assign_roles_user")  && <li className={`mx-4  ${location?.pathname === "/user-permissions"?"active rounded-md":""}`}>
            <Link
              to="/user-permissions"
              className="flex items-center gap-x-4 px-4 py-2.5">
              <svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V17.75" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 11.5H9M5 15.5H17" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5C15.3431 5 14 6.34315 14 8C14 9.65685 15.3431 11 17 11Z" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.0001 14.2095C21.0236 12.301 19.0001 11 17.0001 11C15.0001 11 14.0036 11.5665 12.9751 12.5" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Assign Role to User


              </span>}
            </Link>
          </li>}
          {permissions("company")  && <li className={`mx-4  ${location?.pathname === "/company"?"active rounded-md":""}`}>
            <Link
              to="/company"
              className="flex items-center gap-x-4 px-4 py-2.5">
              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V17.75" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 11.5H9M5 15.5H17" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5C15.3431 5 14 6.34315 14 8C14 9.65685 15.3431 11 17 11Z" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.0001 14.2095C21.0236 12.301 19.0001 11 17.0001 11C15.0001 11 14.0036 11.5665 12.9751 12.5" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Manage Companies/Entities
              </span>}
            </Link>
          </li>}
          {permissions("group") &&  <li className={`mx-4  ${location?.pathname === "/group" ? "active rounded-md" : ""}`}>
            <Link
              to="/group"
              className="flex items-center gap-x-4 px-4 py-2.5">

<svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.1562C12.2091 12.1562 14 10.3654 14 8.15625C14 5.94711 12.2091 4.15625 10 4.15625C7.79086 4.15625 6 5.94711 6 8.15625C6 10.3654 7.79086 12.1562 10 12.1562Z" fill="#4A90E2" />
                <path d="M10.67 13.1763C10.45 13.1663 10.23 13.1562 10 13.1562C7.58 13.1562 5.32 13.8262 3.39 14.9762C2.51 15.4962 2 16.4763 2 17.5063V20.1562H11.26C10.5534 19.1488 10.1265 17.972 10.0229 16.7459C9.91924 15.5197 10.1425 14.288 10.67 13.1763ZM20.75 16.1562C20.75 15.9363 20.72 15.7362 20.69 15.5262L21.83 14.5162L20.83 12.7863L19.38 13.2762C19.06 13.0062 18.7 12.7962 18.3 12.6462L18 11.1562H16L15.7 12.6462C15.3 12.7962 14.94 13.0062 14.62 13.2762L13.17 12.7863L12.17 14.5162L13.31 15.5262C13.28 15.7362 13.25 15.9363 13.25 16.1562C13.25 16.3762 13.28 16.5762 13.31 16.7862L12.17 17.7962L13.17 19.5263L14.62 19.0362C14.94 19.3062 15.3 19.5163 15.7 19.6663L16 21.1562H18L18.3 19.6663C18.7 19.5163 19.06 19.3062 19.38 19.0362L20.83 19.5263L21.83 17.7962L20.69 16.7862C20.72 16.5762 20.75 16.3762 20.75 16.1562ZM17 18.1562C15.9 18.1562 15 17.2562 15 16.1562C15 15.0563 15.9 14.1562 17 14.1562C18.1 14.1562 19 15.0563 19 16.1562C19 17.2562 18.1 18.1562 17 18.1562Z" fill="#4A90E2" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Group For Companies
              </span>}
            </Link>
          </li>}
          {permissions("assign_company_group")  && <li className={`mx-4  ${location?.pathname === "/assign-company-group"?"active rounded-md":""}`}>
            <Link
              to="/assign-company-group"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.1562C12.2091 12.1562 14 10.3654 14 8.15625C14 5.94711 12.2091 4.15625 10 4.15625C7.79086 4.15625 6 5.94711 6 8.15625C6 10.3654 7.79086 12.1562 10 12.1562Z" fill="#4A90E2" />
                <path d="M10.67 13.1763C10.45 13.1663 10.23 13.1562 10 13.1562C7.58 13.1562 5.32 13.8262 3.39 14.9762C2.51 15.4962 2 16.4763 2 17.5063V20.1562H11.26C10.5534 19.1488 10.1265 17.972 10.0229 16.7459C9.91924 15.5197 10.1425 14.288 10.67 13.1763ZM20.75 16.1562C20.75 15.9363 20.72 15.7362 20.69 15.5262L21.83 14.5162L20.83 12.7863L19.38 13.2762C19.06 13.0062 18.7 12.7962 18.3 12.6462L18 11.1562H16L15.7 12.6462C15.3 12.7962 14.94 13.0062 14.62 13.2762L13.17 12.7863L12.17 14.5162L13.31 15.5262C13.28 15.7362 13.25 15.9363 13.25 16.1562C13.25 16.3762 13.28 16.5762 13.31 16.7862L12.17 17.7962L13.17 19.5263L14.62 19.0362C14.94 19.3062 15.3 19.5163 15.7 19.6663L16 21.1562H18L18.3 19.6663C18.7 19.5163 19.06 19.3062 19.38 19.0362L20.83 19.5263L21.83 17.7962L20.69 16.7862C20.72 16.5762 20.75 16.3762 20.75 16.1562ZM17 18.1562C15.9 18.1562 15 17.2562 15 16.1562C15 15.0563 15.9 14.1562 17 14.1562C18.1 14.1562 19 15.0563 19 16.1562C19 17.2562 18.1 18.1562 17 18.1562Z" fill="#4A90E2" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Assign Companies to a Group

              </span>}
            </Link>
          </li>}
      
          {permissions("assign_user_group")  && <li className={`mx-4  ${location?.pathname === "/user-assign-group"?"active rounded-md":""}`}>
            <Link
              to="/user-assign-group"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12.1562C12.2091 12.1562 14 10.3654 14 8.15625C14 5.94711 12.2091 4.15625 10 4.15625C7.79086 4.15625 6 5.94711 6 8.15625C6 10.3654 7.79086 12.1562 10 12.1562Z" fill="#4A90E2" />
                <path d="M10.67 13.1763C10.45 13.1663 10.23 13.1562 10 13.1562C7.58 13.1562 5.32 13.8262 3.39 14.9762C2.51 15.4962 2 16.4763 2 17.5063V20.1562H11.26C10.5534 19.1488 10.1265 17.972 10.0229 16.7459C9.91924 15.5197 10.1425 14.288 10.67 13.1763ZM20.75 16.1562C20.75 15.9363 20.72 15.7362 20.69 15.5262L21.83 14.5162L20.83 12.7863L19.38 13.2762C19.06 13.0062 18.7 12.7962 18.3 12.6462L18 11.1562H16L15.7 12.6462C15.3 12.7962 14.94 13.0062 14.62 13.2762L13.17 12.7863L12.17 14.5162L13.31 15.5262C13.28 15.7362 13.25 15.9363 13.25 16.1562C13.25 16.3762 13.28 16.5762 13.31 16.7862L12.17 17.7962L13.17 19.5263L14.62 19.0362C14.94 19.3062 15.3 19.5163 15.7 19.6663L16 21.1562H18L18.3 19.6663C18.7 19.5163 19.06 19.3062 19.38 19.0362L20.83 19.5263L21.83 17.7962L20.69 16.7862C20.72 16.5762 20.75 16.3762 20.75 16.1562ZM17 18.1562C15.9 18.1562 15 17.2562 15 16.1562C15 15.0563 15.9 14.1562 17 14.1562C18.1 14.1562 19 15.0563 19 16.1562C19 17.2562 18.1 18.1562 17 18.1562Z" fill="#4A90E2" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Assign Group to a User

              </span>}
            </Link>
          </li>}
     
          {/* {permissions("investement")  &&  <li className={`mx-4  ${location?.pathname === "/investment"?"active rounded-md":""}`}>
            <Link
              to="/investment"
              className="flex items-center gap-x-4 px-4 py-2.5">
              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 19C18.55 19 19.021 18.8043 19.413 18.413C19.805 18.0217 20.0007 17.5507 20 17C19.9993 16.4493 19.8037 15.9787 19.413 15.588C19.0223 15.1973 18.5513 15.0013 18 15C17.4487 14.9987 16.978 15.1947 16.588 15.588C16.198 15.9813 16.002 16.452 16 17C15.998 17.548 16.194 18.019 16.588 18.413C16.982 18.807 17.4527 19.0027 18 19ZM17.8 22C17.5667 22 17.3627 21.925 17.188 21.775C17.0133 21.625 16.9007 21.4333 16.85 21.2L16.7 20.5C16.5 20.4167 16.3127 20.3293 16.138 20.238C15.9633 20.1467 15.784 20.034 15.6 19.9L14.875 20.125C14.6583 20.1917 14.446 20.1833 14.238 20.1C14.03 20.0167 13.8673 19.8833 13.75 19.7L13.55 19.35C13.4333 19.15 13.3917 18.9333 13.425 18.7C13.4583 18.4667 13.5667 18.275 13.75 18.125L14.3 17.65C14.2667 17.45 14.25 17.2333 14.25 17C14.25 16.7667 14.2667 16.55 14.3 16.35L13.75 15.875C13.5667 15.725 13.4583 15.5377 13.425 15.313C13.3917 15.0883 13.4333 14.8757 13.55 14.675L13.775 14.3C13.8917 14.1167 14.05 13.9833 14.25 13.9C14.45 13.8167 14.6583 13.8083 14.875 13.875L15.6 14.1C15.7833 13.9667 15.9627 13.8543 16.138 13.763C16.3133 13.6717 16.5007 13.584 16.7 13.5L16.85 12.775C16.9 12.5417 17.0123 12.3543 17.187 12.213C17.3617 12.0717 17.566 12.0007 17.8 12H18.2C18.4333 12 18.6377 12.075 18.813 12.225C18.9883 12.375 19.1007 12.5667 19.15 12.8L19.3 13.5C19.5 13.5833 19.6873 13.6707 19.862 13.762C20.0367 13.8533 20.216 13.966 20.4 14.1L21.125 13.875C21.3417 13.8083 21.5543 13.8167 21.763 13.9C21.9717 13.9833 22.134 14.1167 22.25 14.3L22.45 14.65C22.5667 14.85 22.6083 15.0667 22.575 15.3C22.5417 15.5333 22.4333 15.725 22.25 15.875L21.7 16.35C21.7333 16.55 21.75 16.7667 21.75 17C21.75 17.2333 21.7333 17.45 21.7 17.65L22.25 18.125C22.4333 18.275 22.5417 18.4627 22.575 18.688C22.6083 18.9133 22.5667 19.1257 22.45 19.325L22.225 19.7C22.1083 19.8833 21.95 20.0167 21.75 20.1C21.55 20.1833 21.3417 20.1917 21.125 20.125L20.4 19.9C20.2167 20.0333 20.0377 20.1457 19.863 20.237C19.6883 20.3283 19.5007 20.416 19.3 20.5L19.15 21.225C19.1 21.4583 18.9877 21.646 18.813 21.788C18.6383 21.93 18.434 22.0007 18.2 22H17.8ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V9.9C22 10.2 21.871 10.425 21.613 10.575C21.355 10.725 21.084 10.7333 20.8 10.6C20.3667 10.4 19.9083 10.25 19.425 10.15C18.9417 10.05 18.4583 10 17.975 10C16.0083 10 14.3543 10.6877 13.013 12.063C11.6717 13.4383 11.0007 15.0757 11 16.975C11 17.2917 11.021 17.6043 11.063 17.913C11.105 18.2217 11.1673 18.5257 11.25 18.825C11.3327 19.1243 11.291 19.3953 11.125 19.638C10.959 19.8807 10.734 20.0013 10.45 20H4Z" fill="#4A90E2" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Manage Investors/Customers

              </span>}
            </Link>
          </li>} */}
            {permissions("investor")  && <li className={`mx-4  ${location?.pathname === "/investor"?"active rounded-md":""}`}>
            <Link
              to="/investor"
              className="flex items-center gap-x-4 px-4 py-2.5">
              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 19C18.55 19 19.021 18.8043 19.413 18.413C19.805 18.0217 20.0007 17.5507 20 17C19.9993 16.4493 19.8037 15.9787 19.413 15.588C19.0223 15.1973 18.5513 15.0013 18 15C17.4487 14.9987 16.978 15.1947 16.588 15.588C16.198 15.9813 16.002 16.452 16 17C15.998 17.548 16.194 18.019 16.588 18.413C16.982 18.807 17.4527 19.0027 18 19ZM17.8 22C17.5667 22 17.3627 21.925 17.188 21.775C17.0133 21.625 16.9007 21.4333 16.85 21.2L16.7 20.5C16.5 20.4167 16.3127 20.3293 16.138 20.238C15.9633 20.1467 15.784 20.034 15.6 19.9L14.875 20.125C14.6583 20.1917 14.446 20.1833 14.238 20.1C14.03 20.0167 13.8673 19.8833 13.75 19.7L13.55 19.35C13.4333 19.15 13.3917 18.9333 13.425 18.7C13.4583 18.4667 13.5667 18.275 13.75 18.125L14.3 17.65C14.2667 17.45 14.25 17.2333 14.25 17C14.25 16.7667 14.2667 16.55 14.3 16.35L13.75 15.875C13.5667 15.725 13.4583 15.5377 13.425 15.313C13.3917 15.0883 13.4333 14.8757 13.55 14.675L13.775 14.3C13.8917 14.1167 14.05 13.9833 14.25 13.9C14.45 13.8167 14.6583 13.8083 14.875 13.875L15.6 14.1C15.7833 13.9667 15.9627 13.8543 16.138 13.763C16.3133 13.6717 16.5007 13.584 16.7 13.5L16.85 12.775C16.9 12.5417 17.0123 12.3543 17.187 12.213C17.3617 12.0717 17.566 12.0007 17.8 12H18.2C18.4333 12 18.6377 12.075 18.813 12.225C18.9883 12.375 19.1007 12.5667 19.15 12.8L19.3 13.5C19.5 13.5833 19.6873 13.6707 19.862 13.762C20.0367 13.8533 20.216 13.966 20.4 14.1L21.125 13.875C21.3417 13.8083 21.5543 13.8167 21.763 13.9C21.9717 13.9833 22.134 14.1167 22.25 14.3L22.45 14.65C22.5667 14.85 22.6083 15.0667 22.575 15.3C22.5417 15.5333 22.4333 15.725 22.25 15.875L21.7 16.35C21.7333 16.55 21.75 16.7667 21.75 17C21.75 17.2333 21.7333 17.45 21.7 17.65L22.25 18.125C22.4333 18.275 22.5417 18.4627 22.575 18.688C22.6083 18.9133 22.5667 19.1257 22.45 19.325L22.225 19.7C22.1083 19.8833 21.95 20.0167 21.75 20.1C21.55 20.1833 21.3417 20.1917 21.125 20.125L20.4 19.9C20.2167 20.0333 20.0377 20.1457 19.863 20.237C19.6883 20.3283 19.5007 20.416 19.3 20.5L19.15 21.225C19.1 21.4583 18.9877 21.646 18.813 21.788C18.6383 21.93 18.434 22.0007 18.2 22H17.8ZM4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V9.9C22 10.2 21.871 10.425 21.613 10.575C21.355 10.725 21.084 10.7333 20.8 10.6C20.3667 10.4 19.9083 10.25 19.425 10.15C18.9417 10.05 18.4583 10 17.975 10C16.0083 10 14.3543 10.6877 13.013 12.063C11.6717 13.4383 11.0007 15.0757 11 16.975C11 17.2917 11.021 17.6043 11.063 17.913C11.105 18.2217 11.1673 18.5257 11.25 18.825C11.3327 19.1243 11.291 19.3953 11.125 19.638C10.959 19.8807 10.734 20.0013 10.45 20H4Z" fill="#4A90E2" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text text-[#757575] text-[700] text-[14px]">Manage Investors/Customers

              </span>}
            </Link>
          </li>}
          {permissions("type")  && <li className={`mx-4  ${location?.pathname === "/type" ? "active rounded-md" : ""}`}>
            <Link
              to="/type"
              className="flex items-center gap-x-4 px-4 py-2.5">
               <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z" fill="#4A90E2" />
              </svg>
              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Chart of Account
              </span>}
            </Link>
          </li>}
          {permissions("balance-sheet")  &&<li className={`mx-4  ${location?.pathname === "/balance-sheet" ? "active rounded-md" : ""}`}>
            <Link
              to="/balance-sheet"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 19C0.71667 19 0.479337 18.904 0.288004 18.712C0.0966702 18.52 0.000670115 18.2827 3.44827e-06 18C-0.000663218 17.7173 0.0953369 17.48 0.288004 17.288C0.48067 17.096 0.718003 17 1 17H9V5.825C8.56667 5.675 8.19167 5.44167 7.875 5.125C7.55834 4.80834 7.325 4.43334 7.175 4H4L6.75 10.45C6.83334 10.6333 6.88334 10.821 6.9 11.013C6.91667 11.205 6.90834 11.4007 6.875 11.6C6.725 12.3667 6.31267 12.9583 5.638 13.375C4.96334 13.7917 4.25067 14 3.5 14C2.74934 14 2.037 13.7917 1.363 13.375C0.689003 12.9583 0.276337 12.3667 0.125003 11.6C0.0916701 11.4 0.0833367 11.2043 0.100003 11.013C0.11667 10.8217 0.16667 10.634 0.250003 10.45L3 4H2C1.71667 4 1.47934 3.90433 1.288 3.713C1.09667 3.52167 1.00067 3.284 1 3C0.999337 2.716 1.09534 2.47867 1.288 2.288C1.48067 2.09734 1.718 2.00133 2 2H7.175C7.375 1.41667 7.73334 0.937668 8.25 0.563002C8.76667 0.188335 9.35 0.000668437 10 1.76991e-06C10.65 -0.000664897 11.2333 0.187002 11.75 0.563002C12.2667 0.939002 12.625 1.418 12.825 2H18C18.2833 2 18.521 2.096 18.713 2.288C18.905 2.48 19.0007 2.71733 19 3C18.9993 3.28267 18.9033 3.52033 18.712 3.713C18.5207 3.90567 18.2833 4.00134 18 4H17L19.75 10.45C19.8333 10.6333 19.8833 10.821 19.9 11.013C19.9167 11.205 19.9083 11.4007 19.875 11.6C19.725 12.3667 19.3127 12.9583 18.638 13.375C17.9633 13.7917 17.2507 14 16.5 14C15.7493 14 15.037 13.7917 14.363 13.375C13.689 12.9583 13.2763 12.3667 13.125 11.6C13.0917 11.4 13.0833 11.2043 13.1 11.013C13.1167 10.8217 13.1667 10.634 13.25 10.45L16 4H12.825C12.675 4.43334 12.4417 4.80834 12.125 5.125C11.8083 5.44167 11.4333 5.675 11 5.825V17H19C19.2833 17 19.521 17.096 19.713 17.288C19.905 17.48 20.0007 17.7173 20 18C19.9993 18.2827 19.9033 18.5203 19.712 18.713C19.5207 18.9057 19.2833 19.0013 19 19H1ZM14.625 11H18.375L16.5 6.65L14.625 11ZM1.625 11H5.375L3.5 6.65L1.625 11ZM10 4C10.2833 4 10.521 3.904 10.713 3.712C10.905 3.52 11.0007 3.28267 11 3C10.9993 2.71733 10.9033 2.48 10.712 2.288C10.5207 2.096 10.2833 2 10 2C9.71667 2 9.47934 2.096 9.288 2.288C9.09667 2.48 9.00067 2.71733 9 3C8.99934 3.28267 9.09534 3.52033 9.288 3.713C9.48067 3.90567 9.718 4.00134 10 4Z" fill="#4A90E2" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Manage Balance Sheet Heads/Notes


              </span>}
            </Link>
          </li>}
          {permissions() && <li className="mx-4">
            <Link
              to="/company"
              className="flex items-center gap-x-4 px-4 py-2.5">

              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5.50002C9.99985 4.73407 10.1952 3.98076 10.5676 3.31142C10.94 2.64208 11.477 2.07886 12.1279 1.67511C12.7788 1.27136 13.522 1.04043 14.2871 1.00419C15.0522 0.967946 15.8139 1.1276 16.5 1.46802C17.1861 1.128 17.9476 0.968675 18.7124 1.00512C19.4773 1.04156 20.2201 1.27256 20.8708 1.67627C21.5214 2.07998 22.0583 2.64303 22.4306 3.31215C22.8029 3.98126 22.9982 4.73431 22.9982 5.50002C22.9982 6.26573 22.8029 7.01877 22.4306 7.68789C22.0583 8.35701 21.5214 8.92006 20.8708 9.32376C20.2201 9.72747 19.4773 9.95848 18.7124 9.99492C17.9476 10.0314 17.1861 9.87203 16.5 9.53202C15.8139 9.87244 15.0522 10.0321 14.2871 9.99585C13.522 9.95961 12.7788 9.72868 12.1279 9.32492C11.477 8.92117 10.94 8.35796 10.5676 7.68862C10.1952 7.01928 9.99985 6.26597 10 5.50002ZM18.25 7.98802C18.332 7.99602 18.4153 8.00002 18.5 8.00002C18.8384 7.99929 19.1731 7.92987 19.4839 7.79596C19.7946 7.66206 20.075 7.46646 20.3079 7.22102C20.5409 6.97557 20.7216 6.6854 20.8391 6.36806C20.9566 6.05073 21.0084 5.71284 20.9915 5.37488C20.9745 5.03692 20.8891 4.70591 20.7405 4.40191C20.5919 4.09792 20.3831 3.82726 20.1268 3.60634C19.8704 3.38542 19.5719 3.21883 19.2493 3.11667C18.9267 3.01451 18.5868 2.97891 18.25 3.01202C18.7392 3.74955 19.0001 4.61498 19 5.50002C19.0001 6.38506 18.7392 7.25048 18.25 7.98802ZM8.435 13.25C8.27081 13.2496 8.10814 13.2815 7.95629 13.344C7.80444 13.4064 7.66638 13.4982 7.55 13.614L5.5 15.664V19.5H11.127L16.93 18.05L20.462 16.542C20.5823 16.477 20.6744 16.3699 20.7205 16.2411C20.7667 16.1124 20.7637 15.9712 20.7122 15.8445C20.6606 15.7179 20.5641 15.6147 20.4412 15.5548C20.3182 15.4949 20.1775 15.4825 20.046 15.52L20.026 15.525L13.614 17H10V15H13.125C13.3571 15 13.5796 14.9078 13.7437 14.7437C13.9078 14.5796 14 14.3571 14 14.125C14 13.893 13.9078 13.6704 13.7437 13.5063C13.5796 13.3422 13.3571 13.25 13.125 13.25H8.435ZM15.987 14.402L19.539 13.585C19.9173 13.4855 20.3134 13.4741 20.6968 13.5515C21.0802 13.629 21.4408 13.7932 21.7509 14.0317C22.0609 14.2702 22.3122 14.5766 22.4854 14.9274C22.6586 15.2781 22.7491 15.6638 22.75 16.055C22.7496 16.5299 22.6171 16.9952 22.3674 17.3991C22.1177 17.803 21.7606 18.1295 21.336 18.342L21.309 18.356L17.569 19.951L11.373 21.5H0V14.25H4.086L6.138 12.198C6.44034 11.8967 6.79907 11.6579 7.1937 11.4952C7.58834 11.3326 8.01116 11.2493 8.438 11.25H13.125C13.5259 11.25 13.9225 11.3338 14.2891 11.4961C14.6557 11.6583 14.9843 11.8955 15.2539 12.1924C15.5234 12.4892 15.7278 12.8391 15.8541 13.2197C15.9804 13.6002 16.0256 14.0029 15.987 14.402ZM3.5 16.25H2V19.5H3.5V16.25Z" fill="#4A90E2" />
              </svg>

              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Transactional/Journal Entries



              </span>}
            </Link>
          </li>}
          {permissions() && <li className="mx-4">
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="flex items-center gap-x-4 px-4 py-2.5" type="button"
              onClick={toggable("dropdown-toggle", "hidden")}>
              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H18C16.8954 3 16 3.89543 16 5V19C16 20.1046 16.8954 21 18 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="#4A90E2" />
                <path d="M12.5 9H11.5C10.3954 9 9.5 9.89543 9.5 11V19C9.5 20.1046 10.3954 21 11.5 21H12.5C13.6046 21 14.5 20.1046 14.5 19V11C14.5 9.89543 13.6046 9 12.5 9Z" fill="#4A90E2" />
                <path d="M6 16H5C3.89543 16 3 16.8954 3 18V19C3 20.1046 3.89543 21 5 21H6C7.10457 21 8 20.1046 8 19V18C8 16.8954 7.10457 16 6 16Z" fill="#4A90E2" />
              </svg>



              {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Reports</span>}
              <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : ''}`} width="22" height="23" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_153_4623)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.2889 10.157L5.63186 4.5L7.04586 3.086L11.9959 8.036L16.9459 3.086L18.3599 4.5L12.7029 10.157C12.5153 10.3445 12.261 10.4498 11.9959 10.4498C11.7307 10.4498 11.4764 10.3445 11.2889 10.157Z" fill="#1D3C6A" />
                </g>
                <defs>
                  <clipPath id="clip0_153_4623">
                    <rect width="12" height="24" fill="white" transform="translate(24) rotate(90)" />
                  </clipPath>
                </defs>
              </svg>

            </button>
          </li>}
          {permissions() && <div id="dropdown" className="z-10  dropox transition-all hidden duration-100 dropdown-toggle w-auto bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <ul className="ps-7 py-2 text-sm  bg-white " aria-labelledby="dropdownDefaultButton">
              <li>
                <Link
                  to="/company"
                  className="flex items-center gap-x-4 px-4 py-2.5">
                  <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_153_4638)">
                      <path d="M2.72502 1.935C1.71394 1.935 0.89502 2.75392 0.89502 3.765V7.425V19.32C0.89502 20.8251 2.13487 22.065 3.64002 22.065H20.11C21.6152 22.065 22.855 20.8251 22.855 19.32V6.51V3.765C22.855 2.75392 22.0361 1.935 21.025 1.935H2.72502ZM3.64002 3.765C4.1451 3.765 4.55502 4.17492 4.55502 4.68C4.55502 5.18508 4.1451 5.595 3.64002 5.595C3.13494 5.595 2.72502 5.18508 2.72502 4.68C2.72502 4.17492 3.13494 3.765 3.64002 3.765ZM7.30002 3.765C7.8051 3.765 8.21502 4.17492 8.21502 4.68C8.21502 5.18508 7.8051 5.595 7.30002 5.595C6.79494 5.595 6.38502 5.18508 6.38502 4.68C6.38502 4.17492 6.79494 3.765 7.30002 3.765ZM2.72502 7.425H21.025V19.32C21.025 19.837 20.627 20.235 20.11 20.235H3.64002C3.12302 20.235 2.72502 19.837 2.72502 19.32V7.425ZM10.96 8.34V9.36401C9.69274 9.64583 8.89769 10.5019 8.89769 11.7033C8.89769 12.8974 9.59874 13.6407 11.0261 13.939L12.0466 14.157C13.0073 14.3638 13.3976 14.6511 13.3976 15.1507C13.3976 15.7427 12.7948 16.155 11.9429 16.155C11.0197 16.155 10.3783 15.7482 10.3024 15.1131H8.71898C8.76839 16.3219 9.61405 17.1481 10.96 17.4006V18.405H12.79V17.3971C14.1918 17.1308 15.0311 16.2536 15.0311 14.9452C15.0311 13.73 14.354 13.0496 12.7793 12.7184L11.8339 12.5183C10.9162 12.3234 10.5436 12.0453 10.5436 11.5622C10.5436 10.9647 11.0856 10.5846 11.9054 10.5846C12.6978 10.5846 13.2734 10.9972 13.3494 11.6158H14.8917C14.8514 10.4784 14.0253 9.63677 12.79 9.36044V8.34H10.96Z" fill="#4A90E2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_153_4638">
                        <rect width="24" height="24" fill="white" transform="translate(0.617188)" />
                      </clipPath>
                    </defs>
                  </svg>

                  {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">General Ledger

                  </span>}
                </Link>

              </li>
              <li>
                <Link
                  to="/company"
                  className="flex items-center gap-x-4 px-4 py-2.5">
                  <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_153_4642)">
                      <path d="M0.961426 0.609375V3.09862C2.3578 3.27306 3.50883 3.87881 4.60696 4.57225L3.83352 5.19922L7.01424 6.82125L6.14111 3.32812L5.33158 3.98438C4.69955 2.73406 3.99477 1.55531 3.05814 0.609375H0.961426ZM9.62943 0.609375C9.14118 1.50828 8.71671 2.42581 8.3238 3.36425L7.38036 3.16406L8.19099 6.67188L10.2866 3.78125L9.36186 3.585C10.4022 2.49916 11.4743 1.46647 12.7388 0.609375H9.62943ZM15.8013 3.542C14.6142 3.61956 13.5501 4.15691 12.5191 4.82031L12.1294 3.80375L9.62749 6.39259L13.1929 6.57812L12.7789 5.49803C13.7864 5.46884 14.7938 5.55512 15.8013 6.166V3.542ZM9.73786 7.54294C9.57286 7.54669 9.4188 7.61844 9.20855 7.84278L9.00346 8.06053L8.79055 7.85053C8.55971 7.62303 8.37755 7.56022 8.19289 7.56834C8.00827 7.57647 7.79118 7.67356 7.54836 7.87009L7.35405 8.02728L7.16949 7.85934C6.89136 7.60772 6.65433 7.53316 6.4273 7.54488C6.26205 7.55344 6.09058 7.61569 5.91949 7.72456L7.19974 10.0273C7.68268 10.3227 8.66952 10.4338 9.34818 10.0918L10.5855 7.79978C10.3508 7.70409 10.1399 7.60597 9.95755 7.56834C9.89155 7.55469 9.8303 7.54472 9.77099 7.54294C9.75995 7.54266 9.7489 7.54266 9.73786 7.54294ZM6.9263 10.5489C6.36271 10.9471 5.91018 11.6338 5.73489 12.6397C5.56505 13.6145 5.83264 14.2729 6.30621 14.7217C6.7798 15.1704 7.49064 15.4009 8.21246 15.3916C8.93433 15.3822 9.65421 15.1319 10.1382 14.6748C10.6223 14.2177 10.8961 13.5677 10.7408 12.6377C10.5803 11.6765 10.1658 11.0081 9.64111 10.6035C8.75105 11.074 7.63818 10.974 6.9263 10.5488V10.5489Z" fill="#4A90E2" />
                    </g>
                    <defs>
                      <clipPath id="clip0_153_4642">
                        <rect width="16" height="16" fill="white" transform="translate(0.374512)" />
                      </clipPath>
                    </defs>
                  </svg>


                  {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Profit and Loss


                  </span>}
                </Link>

              </li>
              <li>
                <Link
                  to="/balance-sheet"
                  className="flex items-center gap-x-4 px-4 py-2.5">
                  <svg className={`w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 19C0.71667 19 0.479337 18.904 0.288004 18.712C0.0966702 18.52 0.000670115 18.2827 3.44827e-06 18C-0.000663218 17.7173 0.0953369 17.48 0.288004 17.288C0.48067 17.096 0.718003 17 1 17H9V5.825C8.56667 5.675 8.19167 5.44167 7.875 5.125C7.55834 4.80834 7.325 4.43334 7.175 4H4L6.75 10.45C6.83334 10.6333 6.88334 10.821 6.9 11.013C6.91667 11.205 6.90834 11.4007 6.875 11.6C6.725 12.3667 6.31267 12.9583 5.638 13.375C4.96334 13.7917 4.25067 14 3.5 14C2.74934 14 2.037 13.7917 1.363 13.375C0.689003 12.9583 0.276337 12.3667 0.125003 11.6C0.0916701 11.4 0.0833367 11.2043 0.100003 11.013C0.11667 10.8217 0.16667 10.634 0.250003 10.45L3 4H2C1.71667 4 1.47934 3.90433 1.288 3.713C1.09667 3.52167 1.00067 3.284 1 3C0.999337 2.716 1.09534 2.47867 1.288 2.288C1.48067 2.09734 1.718 2.00133 2 2H7.175C7.375 1.41667 7.73334 0.937668 8.25 0.563002C8.76667 0.188335 9.35 0.000668437 10 1.76991e-06C10.65 -0.000664897 11.2333 0.187002 11.75 0.563002C12.2667 0.939002 12.625 1.418 12.825 2H18C18.2833 2 18.521 2.096 18.713 2.288C18.905 2.48 19.0007 2.71733 19 3C18.9993 3.28267 18.9033 3.52033 18.712 3.713C18.5207 3.90567 18.2833 4.00134 18 4H17L19.75 10.45C19.8333 10.6333 19.8833 10.821 19.9 11.013C19.9167 11.205 19.9083 11.4007 19.875 11.6C19.725 12.3667 19.3127 12.9583 18.638 13.375C17.9633 13.7917 17.2507 14 16.5 14C15.7493 14 15.037 13.7917 14.363 13.375C13.689 12.9583 13.2763 12.3667 13.125 11.6C13.0917 11.4 13.0833 11.2043 13.1 11.013C13.1167 10.8217 13.1667 10.634 13.25 10.45L16 4H12.825C12.675 4.43334 12.4417 4.80834 12.125 5.125C11.8083 5.44167 11.4333 5.675 11 5.825V17H19C19.2833 17 19.521 17.096 19.713 17.288C19.905 17.48 20.0007 17.7173 20 18C19.9993 18.2827 19.9033 18.5203 19.712 18.713C19.5207 18.9057 19.2833 19.0013 19 19H1ZM14.625 11H18.375L16.5 6.65L14.625 11ZM1.625 11H5.375L3.5 6.65L1.625 11ZM10 4C10.2833 4 10.521 3.904 10.713 3.712C10.905 3.52 11.0007 3.28267 11 3C10.9993 2.71733 10.9033 2.48 10.712 2.288C10.5207 2.096 10.2833 2 10 2C9.71667 2 9.47934 2.096 9.288 2.288C9.09667 2.48 9.00067 2.71733 9 3C8.99934 3.28267 9.09534 3.52033 9.288 3.713C9.48067 3.90567 9.718 4.00134 10 4Z" fill="#4A90E2" />
                  </svg>
                  {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Balance Sheet
                  </span>}
                </Link>
              </li>
              <li>
                <Link
                  to="/balance-sheet"
                  className="flex items-center gap-x-4 px-4 py-2.5">
                  <svg className={`bg-transparent w-4 h-4 lg:sidebar-expanded:mx-auto shrink-0 fill-current ${sidebarExpanded ? '' : 'mx-auto'}`} width="22" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_153_4645)">
                      <path d="M9.92857 5.87376C9.8304 5.59484 9.64809 5.35325 9.4068 5.18232C9.16551 5.0114 8.87712 4.91956 8.58143 4.91948H7.47428C7.1602 4.92036 6.85749 5.03707 6.62411 5.24727C6.39073 5.45747 6.2431 5.74637 6.20948 6.05865C6.17586 6.37092 6.25863 6.68463 6.44192 6.93968C6.62522 7.19473 6.89616 7.3732 7.20286 7.44091L8.88571 7.80948C9.23006 7.88463 9.53446 8.08443 9.74041 8.37045C9.94635 8.65647 10.0393 9.00853 10.0014 9.35893C9.96343 9.70933 9.79731 10.0333 9.53493 10.2687C9.27256 10.504 8.93245 10.634 8.58 10.6338H7.62714C7.33179 10.6339 7.04366 10.5425 6.80241 10.3721C6.56116 10.2017 6.37865 9.96073 6.28 9.68233M8.10571 4.91948V3.49091M8.10571 12.0623V10.6338M10.83 19.8723V12.3723C10.83 11.8987 11.0181 11.4445 11.353 11.1096C11.6879 10.7748 12.1421 10.5866 12.6157 10.5866C13.0893 10.5866 13.5435 10.7748 13.8784 11.1096C14.2133 11.4445 14.4014 11.8987 14.4014 12.3723V16.3009H17.2586C18.0163 16.3009 18.7431 16.6019 19.2789 17.1377C19.8147 17.6736 20.1157 18.4003 20.1157 19.158V19.8723" stroke="#4A90E2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.10723 14.2509C6.7892 14.2507 5.50263 13.8482 4.41954 13.0971C3.33645 12.346 2.50846 11.2822 2.04627 10.0478C1.58409 8.8135 1.50973 7.46748 1.83315 6.18974C2.15656 4.912 2.86234 3.76345 3.85611 2.89764C4.84988 2.03182 6.08428 1.49002 7.39427 1.34466C8.70426 1.19931 10.0274 1.45733 11.1868 2.08423C12.3462 2.71113 13.2866 3.67702 13.8823 4.85278C14.4779 6.02854 14.7004 7.35812 14.5201 8.66375" stroke="#4A90E2" strokeLinecap="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_153_4645">
                        <rect width="20" height="20" fill="white" transform="translate(0.874512 0.588013)" />
                      </clipPath>
                    </defs>
                  </svg>

                  {sidebarExpanded && <span className="sidebar-text  text-[700] text-[14px]">Expanded Capital/Equity
                    Statements by Investor

                  </span>}
                </Link>
              </li>

            </ul>
          </div>}

        </ul>
      </div>
    </div >
  );
};

export default Sidebar;

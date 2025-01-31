import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';
import { useLocation } from "react-router-dom";

function DropdownHelp() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const location = useLocation();
  const modules = JSON.parse(localStorage.getItem("modules") || `[]`);
  const roles = JSON.parse(localStorage.getItem("roles") || `[]`);
  const isAdmin = !!roles?.find(e => e?.name === "super_admin");
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
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-9 h-9 flex items-center justify-center hover:bg-gray-100 lg:hover:bg-gray-200 rounded-full ${dropdownOpen && 'bg-gray-200'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">setting</span>
        <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25.397" cy="25" r="25" fill="white" />
          <circle cx="25.397" cy="25" r="24.5" stroke="#4A90E2" strokeOpacity="0.60278" />
          <path fillRule="evenodd" clipRule="evenodd" d="M35.397 22.492C34.2716 22.7814 33.4356 23.8103 33.4356 25C33.4356 26.1897 34.2716 27.2186 35.397 27.508C35.1397 28.5048 34.7539 29.4373 34.2394 30.3055C33.2426 29.6945 31.9243 29.8232 31.0883 30.6913C30.2523 31.5595 30.1237 32.8457 30.7024 33.8424C29.8343 34.3569 28.9018 34.7428 27.905 35C27.6156 33.8746 26.6188 33.0386 25.397 33.0386C24.1751 33.0386 23.1783 33.8746 22.8889 35C21.8921 34.7428 20.9597 34.3569 20.0915 33.8424C20.7024 32.8457 20.5738 31.5273 19.7057 30.6913C18.8375 29.8553 17.5513 29.7267 16.5545 30.3055C16.0401 29.4373 15.6542 28.5048 15.397 27.508C16.5224 27.2186 17.3584 26.1897 17.3584 25C17.3584 23.8103 16.5224 22.7814 15.397 22.492C15.6542 21.4952 16.0401 20.5627 16.5545 19.6945C17.5513 20.3055 18.8696 20.1768 19.7057 19.3087C20.5417 18.4405 20.6703 17.1543 20.0915 16.1576C20.9597 15.6431 21.8921 15.2572 22.8889 15C23.1783 16.1254 24.2073 16.9614 25.397 16.9614C26.5867 16.9614 27.6156 16.1254 27.905 15C28.9018 15.2572 29.8343 15.6431 30.7024 16.1576C30.0915 17.1543 30.2201 18.4727 31.0883 19.3087C31.9565 20.1447 33.2426 20.2733 34.2394 19.6945C34.7539 20.5627 35.1397 21.4952 35.397 22.492ZM30.1558 29.7588C31.0883 28.8264 32.3745 28.4727 33.5963 28.6977C33.6719 28.5719 33.7277 28.4263 33.7792 28.2919L33.7792 28.2918C33.7935 28.2546 33.8075 28.2182 33.8214 28.1833C32.7925 27.4759 32.1494 26.3183 32.1494 25C32.1494 23.6817 32.7925 22.5241 33.8214 21.8167L33.5963 21.3023C32.3745 21.5273 31.0883 21.1736 30.1558 20.2412C29.2233 19.3087 28.8696 18.0225 29.0947 16.8006C28.9688 16.7251 28.8232 16.6693 28.6888 16.6178L28.6888 16.6177L28.6888 16.6177C28.6515 16.6035 28.6151 16.5895 28.5803 16.5756C27.8729 17.6045 26.7153 18.2476 25.397 18.2476C24.0786 18.2476 22.9211 17.6045 22.2137 16.5756C22.1788 16.5895 22.1424 16.6035 22.1051 16.6178L22.1051 16.6178C21.9707 16.6693 21.8251 16.7251 21.6992 16.8006C21.9243 18.0225 21.5706 19.3087 20.6381 20.2412C19.7057 21.1736 18.4195 21.5273 17.1976 21.3023C17.1221 21.4281 17.0663 21.5737 17.0147 21.7082L17.0147 21.7082C17.0004 21.7454 16.9865 21.7818 16.9725 21.8167C18.0015 22.5241 18.6446 23.6817 18.6446 25C18.6446 26.3183 18.0015 27.4759 16.9725 28.1833C16.9865 28.2182 17.0004 28.2545 17.0147 28.2918L17.0147 28.2918L17.0147 28.2918C17.0663 28.4263 17.1221 28.5719 17.1976 28.6977C18.4195 28.4727 19.7057 28.8264 20.6381 29.7588C21.5706 30.6913 21.9243 31.9775 21.6992 33.1994C21.86 33.2958 22.0208 33.3601 22.2137 33.4244C22.9211 32.3955 24.0786 31.7524 25.397 31.7524C26.7153 31.7524 27.8729 32.3955 28.5803 33.4244L29.0947 33.1994C28.8696 31.9775 29.2233 30.6913 30.1558 29.7588ZM25.397 20.4984C22.9211 20.4984 20.8954 22.5241 20.8954 25C20.8954 27.4759 22.9211 29.5016 25.397 29.5016C27.8729 29.5016 29.8986 27.4759 29.8986 25C29.8986 22.5241 27.8729 20.4984 25.397 20.4984ZM22.1815 25C22.1815 26.7685 23.6285 28.2154 25.397 28.2154C27.1655 28.2154 28.6124 26.7685 28.6124 25C28.6124 23.2315 27.1655 21.7846 25.397 21.7846C23.6285 21.7846 22.1815 23.2315 22.1815 25Z" fill="#4A90E2" />
        </svg>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-gray-200  py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 -right-30`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-3">Need help?</div>
          <ul>
            {permissions("role") &&<li>
              <Link
                className={`font-medium text-sm text-violet-500 hover:text-violet-600 flex items-center py-1 px-3  ${location?.pathname == '/role'?'active':''}`}
                to="/role"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg className="w-3 h-3 fill-current text-violet-500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <rect y="3" width="12" height="9" rx="1" />
                  <path d="M2 0h8v2H2z" />
                </svg>
                <span>Roles</span>
              </Link>
            </li>}
            {permissions("assign_roles_module") &&<li>
              <Link
                className={`font-medium text-sm text-violet-500 hover:text-violet-600 flex items-center py-1 px-3  ${location?.pathname == '/permissions'?'active':''}`}
                to="/permissions"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg className="w-3 h-3 fill-current text-violet-500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
                </svg>
                <span>Permissions</span>
              </Link>
            </li>}
            {permissions("user") &&<li>
              <Link
                className={`font-medium text-sm text-violet-500 hover:text-violet-600 flex items-center py-1 px-3  ${location?.pathname == '/manage'?'active':''}`}
                to="/manage"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg className="w-3 h-3 fill-current text-violet-500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" />
                </svg>
                <span>User Management</span>
              </Link>
            </li>}
            {permissions("assign_roles_user") &&<li>
              <Link
                className={`font-medium text-sm text-violet-500 hover:text-violet-600 flex items-center py-1  px-3 ${location?.pathname == '/user-permissions'?'active':''}`}
                to="/user-permissions"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                   <svg className="w-3 h-3 fill-current text-violet-500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
                </svg>
                <span>Assign Role to User</span>
              </Link>
            </li>}
            <li>
              <Link
                className={`font-medium text-sm text-violet-500 hover:text-violet-600 flex items-center py-1  px-3 ${location?.pathname == '/setting'?'active':''}`}
                to="/setting"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                    {/* <svg className="w-3 h-3 fill-current text-violet-500 shrink-0 mr-2" viewBox="0 0 12 12">
                  <rect y="3" width="12" height="9" rx="1" />
                  <path d="M2 0h8v2H2z" />
                </svg> */}
                <svg fill="#000000" className="w-3 h-3 fill-current shrink-0 mr-2" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 54 54" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571 c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571 c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78 C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571 c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571 c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052 c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966 c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42 c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052 c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553 c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114 S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22 C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571 c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854 c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052 c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572 c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294 C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052 c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553 c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78 C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64 c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104 l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"></path> <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7 s7,3.141,7,7S30.859,34,27,34z"></path> </g> </g></svg>
                <span>Basic Setting</span>
              </Link>
            </li>
          
          </ul>
        </div>
      </Transition>
     
    </div>
  )
}

export default DropdownHelp;
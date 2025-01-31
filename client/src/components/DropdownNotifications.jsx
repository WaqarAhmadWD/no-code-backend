import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transition from '../utils/Transition';

function DropdownNotifications({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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
        className={`relative w-9 h-9 flex items-center justify-center  rounded-full ${dropdownOpen && 'bg-gray-200'}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg width="51" height="50" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          
          <circle cx="25.397" cy="25" r="24.5" stroke="#4A90E2" strokeOpacity="0.60278" />
          <path fillRule="evenodd" clipRule="evenodd" d="M31.157 27.9952V22.29C31.157 19.3423 28.917 16.9334 26.037 16.6165V15.6339C26.037 15.2853 25.749 15 25.397 15C25.045 15 24.757 15.2853 24.757 15.6339V16.6165C21.877 16.9334 19.637 19.3423 19.637 22.29V27.9952C19.637 29.3582 18.677 30.4992 17.397 30.7845V32.7496H33.397V30.7845C32.117 30.4992 31.157 29.3582 31.157 27.9952ZM25.333 35C26.741 35 27.989 34.3661 28.821 33.3835H21.845C22.677 34.3661 23.957 35 25.333 35ZM20.917 27.9952C20.917 29.4532 20.149 30.7528 18.965 31.4818C18.869 31.5452 31.925 31.5452 31.829 31.4818C30.645 30.7528 29.877 29.4532 29.877 27.9952V22.29C29.877 20.0079 28.149 18.1379 25.909 17.8843L25.397 17.8209L24.885 17.8843C22.645 18.1379 20.917 20.0079 20.917 22.29V27.9952Z" fill="#4A90E2" />
          
        </svg>



        <div className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-gray-100 rounded-full"></div>
      </button>

      {/* <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-72 bg-white border border-gray-200 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-200"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">Notifications</div>
          <ul>
            <li className="border-b border-gray-200 last:border-0">
              <Link
                className="block py-2 px-4"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">📣 <span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-gray-400">Feb 12, 2024</span>
              </Link>
            </li>
            <li className="border-b border-gray-200 last:border-0">
              <Link
                className="block py-2 px-4"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">📣 <span className="font-medium text-gray-800">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-gray-400">Feb 9, 2024</span>
              </Link>
            </li>
            <li className="border-b border-gray-200last:border-0">
              <Link
                className="block py-2 px-4"
                to="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2">🚀<span className="font-medium text-gray-800">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                <span className="block text-xs font-medium text-gray-400">Jan 24, 2024</span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition> */}
    </div>
  )
}

export default DropdownNotifications;
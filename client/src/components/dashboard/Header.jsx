

import Notifications from '../DropdownNotifications';
import Help from '../DropdownHelp';
import UserMenu from '../DropdownProfile';
import PropTypes from 'prop-types';
Header.propTypes = {
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
};

function Header({
  sidebarOpen,
  setSidebarOpen,
}) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  // const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <header>
      <div className="px-4 sm:px-4 lg:px-5">
        <div className="header-sec mt-3 px-3 flex items-center justify-between h-16 ">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <div className="text-left hidden md:block">
              <h6 className='welcome-note '>Welcome Back!</h6>
              <h3 className='username text-xl'>{user?.name || "unknown"}</h3>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <Notifications align="right" />
            <Help align="right" />
            <hr className="w-px h-8 bg-gray-600" />
            <UserMenu align="right" />
         

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
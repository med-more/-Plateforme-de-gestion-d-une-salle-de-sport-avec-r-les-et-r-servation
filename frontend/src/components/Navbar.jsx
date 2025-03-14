import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition duration-300">
            Gym Management
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-blue-200 transition duration-300">
                  Dashboard
                </Link>
                <Link to="/sessions" className="text-white hover:text-blue-200 transition duration-300">
                  Sessions
                </Link>
                <Link to="/reservations" className="text-white hover:text-blue-200 transition duration-300">
                  Reservations
                </Link>
                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="text-white hover:text-blue-200 transition duration-300 focus:outline-none">
                    Profile
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 transition duration-300">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:text-blue-200 transition duration-300">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className="md:hidden bg-blue-700">
        <div className="px-4 py-2 flex flex-col space-y-2">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/sessions" className="text-white hover:text-blue-200">
                Sessions
              </Link>
              <Link to="/reservations" className="text-white hover:text-blue-200">
                Reservations
              </Link>
              <Link to="/profile" className="text-white hover:text-blue-200">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-white hover:text-blue-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
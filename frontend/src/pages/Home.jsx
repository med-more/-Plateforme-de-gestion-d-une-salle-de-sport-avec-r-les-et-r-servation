import { useAuth } from '../utils/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gymImage from '../assets/images/gym.jpg'; // Add a gym-related image in the assets folder

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${gymImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-blue-500">GymFlow</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Transform your fitness journey with our state-of-the-art gym management platform. Whether you're a member or a trainer, we've got you covered.
        </p>

        {/* Buttons */}
        {!user ? (
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
            >
              Register
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
        )}
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 mt-16 w-full max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Why Choose GymFlow?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4 text-blue-600">💪</div>
            <h3 className="text-xl font-bold mb-2">Personalized Sessions</h3>
            <p className="text-gray-600">
              Tailored workout plans designed by professional trainers to help you achieve your goals.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4 text-blue-600">📅</div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Reserve your sessions in just a few clicks. No hassle, no delays.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4 text-blue-600">👥</div>
            <h3 className="text-xl font-bold mb-2">Community Support</h3>
            <p className="text-gray-600">
              Join a community of fitness enthusiasts and stay motivated together.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
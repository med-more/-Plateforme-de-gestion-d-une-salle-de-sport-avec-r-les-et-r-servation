import { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth.jsx';
import { getDashboardData } from '../services/dashboardService';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      console.error('User ID is undefined'); // Log an error if user or user.id is undefined
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await getDashboardData(user.id);
        setDashboardData(data);
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
        console.error('Dashboard error:', error); // Log the error
      }
    };

    fetchDashboardData();
  }, [user]); // Add user to the dependency array

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Sessions</h2>
          <p className="text-gray-600">{dashboardData.totalSessions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Upcoming Sessions</h2>
          <p className="text-gray-600">{dashboardData.upcomingSessions}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Completed Sessions</h2>
          <p className="text-gray-600">{dashboardData.completedSessions}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
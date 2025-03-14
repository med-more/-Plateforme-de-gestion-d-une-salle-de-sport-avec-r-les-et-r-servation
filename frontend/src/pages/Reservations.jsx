import { useEffect, useState } from 'react';
import { useAuth } from '../utils/auth.jsx';
import { getUserReservations } from '../services/reservationService';
import { toast } from 'react-hot-toast';

function Reservations() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getUserReservations(user.id);
        setReservations(data);
      } catch (error) {
        toast.error('Failed to fetch reservations');
        console.error('Reservations error:', error); // Log the error
      }
    };

    fetchReservations();
  }, [user.id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{reservation.session.title}</h2>
            <p className="text-gray-600">{new Date(reservation.session.date).toLocaleDateString()}</p>
            <p className="text-gray-600">{reservation.session.time}</p>
            <p className="text-gray-600">Coach: {reservation.session.coach.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservations;
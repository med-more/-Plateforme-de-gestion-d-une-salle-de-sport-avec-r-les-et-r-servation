import { motion } from 'framer-motion';

function ReservationList({ reservations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reservations.map((reservation) => (
        <motion.div
          key={reservation._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-2">{reservation.session.title}</h2>
          <p className="text-gray-600 mb-2">{new Date(reservation.session.date).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2">{reservation.session.time}</p>
          <p className="text-gray-600 mb-2">Coach: {reservation.session.coach.name}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default ReservationList;
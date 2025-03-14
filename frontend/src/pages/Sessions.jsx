import { useEffect, useState } from 'react';
import { getSessions } from '../services/sessionService';
import SessionList from '../components/SessionList';

function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sessions</h1>
      <SessionList sessions={sessions} />
    </div>
  );
}

export default Sessions;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token'); // stored during login
        const res = await axios.get('/api/match', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error('Error fetching matches:', err.response?.data || err.message);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Skill Matches</h2>
      {matches.length === 0 ? (
        <p>No matches found yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((user) => (
            <div key={user._id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p><strong>Teaches:</strong> {user.teachSkills.join(', ')}</p>
              <p><strong>Wants to Learn:</strong> {user.learnSkills.join(', ')}</p>
              <p><strong>Timezone:</strong> {user.timezone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [suggestedPets, setSuggestedPets] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [friendsUpdates, setFriendsUpdates] = useState([]);
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    // Fetch suggested pets
    axios.get('/api/suggested-pets')
      .then(response => setSuggestedPets(response.data))
      .catch(error => console.error('Error fetching suggested pets:', error));

    // Fetch recent messages
    axios.get('/api/recent-messages')
      .then(response => setRecentMessages(response.data))
      .catch(error => console.error('Error fetching recent messages:', error));

    // Fetch friends updates
    axios.get('/api/friends-updates')
      .then(response => setFriendsUpdates(response.data))
      .catch(error => console.error('Error fetching friends updates:', error));

    // Fetch user statistics
    axios.get('/api/user-stats')
      .then(response => setUserStats(response.data))
      .catch(error => console.error('Error fetching user statistics:', error));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      
      <section>
        <h2>Suggested Pets</h2>
        <ul>
          {suggestedPets.map(pet => (
            <li key={pet.id}>{pet.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Recent Messages</h2>
        <ul>
          {recentMessages.map(message => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Friends' Updates</h2>
        <ul>
          {friendsUpdates.map(update => (
            <li key={update.id}>{update.content}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>User Statistics</h2>
        <ul>
          <li>Pets Followed: {userStats.petsFollowed}</li>
          <li>Posts: {userStats.posts}</li>
          <li>Friends: {userStats.friends}</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
90
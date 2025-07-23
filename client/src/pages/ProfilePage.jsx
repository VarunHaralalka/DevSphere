import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";

function ProfilePage() {
  const { id } = useParams();
  const { user: loggedInUser } = useUserStore();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine if this is the logged-in user's profile
  const isOwnProfile =
    !id || (loggedInUser && String(loggedInUser.user_id) === String(id));
  const userIdToFetch = id || (loggedInUser && loggedInUser.user_id);

  // Fetch user info
  const fetchUser = async () => {
    if (!userIdToFetch) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userIdToFetch}`
      );
      setUser(response.data);
    } catch (err) {
      setError("User not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [userIdToFetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return null;

  return (
    <ProfileCard
      user={user}
      editable={isOwnProfile}
      onProfileUpdate={fetchUser}
    />
  );
}

export default ProfilePage;

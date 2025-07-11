import { useUserStore } from "../stores/userStore";
import ProfileCard from "../components/ProfileCard";

function Profile() {
  const { user } = useUserStore();
  const { email, phone, username } = user;
  return (
    <ProfileCard
      username={username}
      email={email}
      phone={phone}
      editable={true}
    />
  );
}

export default Profile;

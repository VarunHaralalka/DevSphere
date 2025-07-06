import { useUserStore } from "../stores/userStore";

function Profile() {
  const { user } = useUserStore();
  const { email, phone, username } = user;
  console.log(user);
  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-3 py-4">
        <div className="text-center">
          <img
            src="/assets/placeholder.jpg"
            alt="User Profile"
            width="100"
            className="rounded-circle"
          />
          <h3 className="mt-2">{username}</h3>
          <span className="mt-1 clearfix">{email}</span>

          <hr className="line" />

          <small className="mt-4">{phone}</small>
        </div>
      </div>
    </div>
  );
}

export default Profile;

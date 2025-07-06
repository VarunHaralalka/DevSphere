import "../index.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { userPostsStore } from "../stores/postsStore";
import { emailValidation, passwordValidation } from "../components/Validation";

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setUserPosts } = userPostsStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        const { user_id, email, phone, username } = response.data.user;
        setUser({ user_id, email, phone, username });
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("root", {
        message: "Invalid login credentials",
      });
    }
  };

  return (
    <main className="form-signin w-100 m-auto">
      <img
        className="mb-4"
        src="/src/assets/devsphere-logo.png"
        alt="DevSphere Logo"
        width="100"
        height="100"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please Log in</h1>
        <div className="form-floating mb-3">
          <input
            {...register("email", emailValidation)}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email Address</label>
          {errors.email && (
            <p className="text-danger mt-1 mb-0">{errors.email.message}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register("password", passwordValidation)}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
          {errors.password && (
            <p className="text-danger mt-1 mb-0">{errors.password.message}</p>
          )}
        </div>
        <button
          className="btn btn-outline-light w-100 py-2"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
          {errors.root && (
            <p className="text-danger mt-1 mb-0">{errors.root.message}</p>
          )}
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="text-muted">
          Don't have an account?{" "}
          <a href="/signup" className="text-decoration-none">
            Sign up here
          </a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;

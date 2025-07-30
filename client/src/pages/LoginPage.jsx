import "../index.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosConfig";
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
      const response = await axiosInstance.post("/auth/login", data);

      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);

        const { user_id, email, phone, username } = response.data.user;
        setUser({ user_id, email, phone, username });

        try {
          const postsResponse = await axiosInstance.get(`/posts/${user_id}`);
          setUserPosts(postsResponse.data);
        } catch (postsError) {
          console.error("Error fetching user posts:", postsError);
        }

        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Invalid login credentials";
      setError("root", {
        message: errorMessage,
      });
    }
  };

  return (
    <main className="form-signin w-100 m-auto" style={{ maxWidth: "25rem" }}>
      <div className="d-flex justify-content-center">
        <img
          className="mb-4"
          src="/assets/DevSphere-Logo-main.png"
          alt="DevSphere Logo"
          width="500"
          height="200"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal" style={{ textAlign: "center" }}>
          Please Log in
        </h1>
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
        </button>
        {errors.root && (
          <p className="text-danger mt-1 mb-0" style={{ textAlign: "center" }}>
            {errors.root.message}
          </p>
        )}
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

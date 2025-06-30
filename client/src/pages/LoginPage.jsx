import "../index.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
          {errors.email && (
            <p className="text-danger mt-1 mb-0">{errors.email.message}</p>
          )}
        </div>
        <div className="form-floating mb-3">
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
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
      </form>
    </main>
  );
}

export default LoginPage;

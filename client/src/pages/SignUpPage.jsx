import "../index.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import {
  phoneValidation,
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "../components/Validation";

function SignUpPage() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );
      console.log(response.data);
      if (response.status === 201) {
        const { user_id, email, phone, username } = response.data.user;
        setUser({ user_id, email, phone, username });
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("root", {
        message: "Error signing up",
      });
    }
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="/src/assets/devsphere-logo.png"
              alt="DevSphere Logo"
              width="100"
              height="100"
            />
            <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    {...register("username", usernameValidation)}
                    type="text"
                    className="form-control"
                    id="floatingUsername"
                    placeholder="Username"
                  />
                  <label htmlFor="floatingUsername">Username</label>
                  {errors.username && (
                    <p className="text-danger mt-1 mb-0">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    {...register("phone", phoneValidation)}
                    type="tel"
                    className="form-control"
                    id="floatingPhone"
                    placeholder="9876543210"
                  />
                  <label htmlFor="floatingPhone">Phone Number</label>
                  {errors.phone && (
                    <p className="text-danger mt-1 mb-0">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    {...register("email", emailValidation)}
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingEmail">Email address</label>
                  {errors.email && (
                    <p className="text-danger mt-1 mb-0">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    {...register("password", passwordValidation)}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && (
                    <p className="text-danger mt-1 mb-0">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="btn btn-success w-100 py-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
              {errors.root && (
                <p className="text-danger mt-1 mb-0">{errors.root.message}</p>
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-muted">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;

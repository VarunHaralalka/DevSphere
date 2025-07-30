import "../index.css";
import { useForm } from "react-hook-form";
import axiosInstance from "../utils/axiosConfig";
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
      // create account
      const res = await axiosInstance.post("/auth/signup", data);

      if (res.status === 201) {
        // 1️⃣ store access token
        localStorage.setItem("accessToken", res.data.accessToken);

        // 2️⃣ populate user store
        const { user_id, email, phone, username } = res.data.user;
        setUser({ user_id, email, phone, username });

        // 3️⃣ ensure an empty user_info row exists
        axiosInstance.post("/user-info", { user_id }).catch(() => {
          /* non-fatal – ignore */
        });

        // 4️⃣ redirect home
        navigate("/");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Error signing up. Please check your details and try again.";
      setError("root", { message: msg });
    }
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="text-center mb-4">
            <img
              className="mb-4"
              src="/assets/DevSphere-Logo-main.png"
              alt="DevSphere Logo"
              width="400"
              height="200"
            />
            <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              {/* Username */}
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

              {/* Phone */}
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

              {/* Email */}
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

              {/* Password */}
              <div className="col-md-6">
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
                    <p className="text-danger mt-1 mb-0">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success"
                style={{ minWidth: "12rem", width: "40%" }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            {/* Root error */}
            {errors.root && (
              <p className="text-danger mt-1 mb-0 text-center">
                {errors.root.message}
              </p>
            )}
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

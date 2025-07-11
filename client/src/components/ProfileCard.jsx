import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ProfileCard({
  username,
  email,
  phone,
  fullname = "",
  about = "",
  github = "",
  portfolio = "",
  location = "",
  linkedin = "",
  skills = "",
  techstack = "",
  openToWork = false,
  editable = false,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const response = axios.get(`/api/user-info/${user_id}`);
    console.log(response.data);
    setUserInfo(response.data);
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const renderFieldRow = (
    label1,
    name1,
    type1,
    label2,
    name2,
    type2,
    placeholder1 = "",
    placeholder2 = ""
  ) => (
    <div className="row mb-3">
      <div className="col-md-6">
        <label className="form-label fw-semibold">{label1}</label>
        <input
          type={type1}
          className="form-control"
          {...register(name1)}
          readOnly={!isEditMode}
          placeholder={placeholder1}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-semibold">{label2}</label>
        <input
          type={type2}
          className="form-control"
          {...register(name2)}
          readOnly={!isEditMode}
          placeholder={placeholder2}
        />
      </div>
    </div>
  );

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-lg p-5 border-0"
        style={{ maxWidth: 700, width: "100%", borderRadius: 24 }}
      >
        <div className="text-center mb-4">
          <img
            src="/assets/placeholder.jpg"
            alt="User Profile"
            width="120"
            className="rounded-circle border border-3 border-primary mb-3"
            style={{
              objectFit: "cover",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          />
          <h2 className="mt-2 mb-1 fw-bold text-primary">{username}</h2>
        </div>
        <form>
          {renderFieldRow(
            "Full Name",
            "fullname",
            "text",
            "Location",
            "location",
            "text"
          )}
          <div className="mb-3">
            <label className="form-label fw-semibold">About</label>
            <textarea
              className="form-control"
              {...register("about")}
              readOnly={!isEditMode}
              rows={2}
            />
          </div>
          {renderFieldRow("Email", "email", "email", "Mobile", "phone", "tel")}
          {renderFieldRow(
            "GitHub",
            "github",
            "url",
            "Portfolio",
            "portfolio",
            "url",
            "https://github.com/username",
            "https://yourportfolio.com"
          )}
          {renderFieldRow(
            "LinkedIn",
            "linkedin",
            "url",
            "Tech Stack",
            "techstack",
            "text",
            "https://linkedin.com/in/username",
            "e.g. React, Node.js, PostgreSQL"
          )}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Skills</label>
              <input
                type="text"
                className="form-control"
                {...register("skills")}
                readOnly={!isEditMode}
                placeholder="e.g. JavaScript, Communication, Leadership"
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label fw-semibold me-3 mb-0">
                Open to Work
              </label>
              <input
                type="checkbox"
                className="form-check-input me-2"
                {...register("openToWork")}
                disabled={!isEditMode}
                hidden={!isEditMode}
                id="openToWorkCheckbox"
              />
              <label
                htmlFor="openToWorkCheckbox"
                className="form-check-label mb-0"
              >
                {values.openToWork ? "Yes" : "No"}
              </label>
            </div>
          </div>
          {editable && !isEditMode && (
            <div className="text-end mt-4">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={() => setIsEditMode(true)}
              >
                Modify
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileCard;

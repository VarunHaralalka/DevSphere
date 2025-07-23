import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";

function ProfileCard({ user, editable = false, onProfileUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalValues, setOriginalValues] = useState(null);

  const {
    user_id,
    username = "",
    email = "",
    phone = "",
    fullname = "",
    about = "",
    github = "",
    portfolio = "",
    location = "",
    linkedin = "",
    skills = "",
    techstack = "",
    openToWork = false,
  } = user || {};

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullname,
      location,
      about,
      github,
      portfolio,
      linkedin,
      skills,
      techstack,
      openToWork,
    },
  });

  const values = watch();

  const handleModify = () => {
    setOriginalValues({
      fullname,
      location,
      about,
      github,
      portfolio,
      linkedin,
      skills,
      techstack,
      openToWork,
    });
    setIsEditMode(true);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const clean = (val) => (val === undefined || val === "" ? null : val);
    const payload = {
      fullname: clean(data.fullname),
      about: clean(data.about),
      github: clean(data.github),
      portfolio: clean(data.portfolio),
      image_url: null,
      location: clean(data.location),
      linkedin: clean(data.linkedin),
      skills: clean(data.skills),
      tech_stack: clean(data.techstack),
      open_to_work: data.openToWork ?? false,
    };
    try {
      await axios.put(
        `http://localhost:5000/api/user-info/${user_id}`,
        payload
      );
      setIsEditMode(false);
      setOriginalValues(null);
      if (onProfileUpdate) onProfileUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    reset(originalValues);
    setIsEditMode(false);
    setOriginalValues(null);
  };

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
          placeholder={isEditMode ? placeholder1 : ""}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label fw-semibold">{label2}</label>
        <input
          type={type2}
          className="form-control"
          {...register(name2)}
          readOnly={!isEditMode}
          placeholder={isEditMode ? placeholder2 : ""}
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
        {/* Email and Phone (read-only, not in form) */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Mobile</label>
            <input type="tel" className="form-control" value={phone} readOnly />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder={
                  isEditMode ? "e.g. JavaScript, Communication, Leadership" : ""
                }
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label className="form-label fw-semibold me-3 mb-0">
                Open to Work
              </label>
              {isEditMode ? (
                <>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    {...register("openToWork")}
                    id="openToWorkCheckbox"
                  />
                  <label
                    htmlFor="openToWorkCheckbox"
                    className="form-check-label mb-0"
                  >
                    {values.openToWork ? "Yes" : "No"}
                  </label>
                </>
              ) : (
                <span className="text-muted">
                  {values.openToWork ? "Yes" : "No"}
                </span>
              )}
            </div>
          </div>
          {editable && !isEditMode && (
            <div className="text-end mt-4">
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleModify}
              >
                Modify
              </button>
            </div>
          )}
          {editable && isEditMode && (
            <div className="text-end mt-4">
              <button
                type="button"
                className="btn btn-secondary px-4 me-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  user: PropTypes.shape({
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    fullname: PropTypes.string,
    about: PropTypes.string,
    github: PropTypes.string,
    portfolio: PropTypes.string,
    location: PropTypes.string,
    linkedin: PropTypes.string,
    skills: PropTypes.string,
    techstack: PropTypes.string,
    openToWork: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }).isRequired,
  editable: PropTypes.bool,
  onProfileUpdate: PropTypes.func,
};

export default ProfileCard;

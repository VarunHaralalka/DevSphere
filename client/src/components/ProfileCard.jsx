import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserStore } from "../stores/userStore";

function ProfileCard({ user, editable = false, onProfileUpdate }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });
  const { user: currentUser, setUser } = useUserStore();

  const {
    user_id,
    username = "",
    email = "",
    phone = "",
    fullname = "",
    location = "",
    about = "",
    github = "",
    portfolio = "",
    linkedin = "",
    skills = "",
    techstack = "",
    open_to_work: openToWork = false,
  } = user ?? {};

  const {
    register,
    handleSubmit,
    reset,
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

  const urlRule = (rx) => (v) => !v || rx.test(v) || "Invalid URL";

  const onSubmit = async (data) => {
    const payload = {
      fullname: data.fullname || null,
      location: data.location || null,
      about: data.about || null,
      github: data.github || null,
      portfolio: data.portfolio || null,
      linkedin: data.linkedin || null,
      skills: data.skills || null,
      tech_stack: data.techstack || null,
      open_to_work: data.openToWork ?? false,
      image_url: null,
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/user-info/${user_id}`,
        payload
      );

      if (currentUser?.user_id === user_id) {
        setUser({ ...currentUser, ...payload, techstack: payload.tech_stack });
      }

      setFeedback({ type: "success", msg: "Profile updated successfully!" });
      setIsEditMode(false);
      onProfileUpdate?.(res.data);
    } catch (err) {
      setFeedback({
        type: "danger",
        msg: err.response?.data?.error || "Update failed, please retry.",
      });
    }
  };

  const ReadOnlyPair = ({ label1, value1, label2, value2 }) => (
    <div className="row mb-3">
      {[
        [label1, value1],
        [label2, value2],
      ].map(
        ([label, value], idx) =>
          label && (
            <div className="col-md-6" key={idx}>
              <label className="form-label fw-bold">{label}</label>
              <p className="form-control-plaintext mb-0">
                {value || "Not specified"}
              </p>
            </div>
          )
      )}
    </div>
  );

  const EditPair = (
    name1,
    label1,
    name2,
    label2,
    placeholder1 = "",
    placeholder2 = "",
    opts1 = {},
    opts2 = {}
  ) => (
    <div className="row mb-3">
      {[
        [name1, label1, placeholder1, opts1],
        [name2, label2, placeholder2, opts2],
      ].map(
        ([name, label, ph, opts], idx) =>
          name && (
            <div className="col-md-6" key={idx}>
              <label className="form-label fw-bold">{label}</label>
              <input
                className="form-control"
                placeholder={ph}
                {...register(name, opts)}
              />
            </div>
          )
      )}
    </div>
  );

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Profile Information</h4>
      </div>

      <div className="card-body">
        {feedback.msg && (
          <div className={`alert alert-${feedback.type}`}>{feedback.msg}</div>
        )}

        {!isEditMode && (
          <>
            <ReadOnlyPair
              label1="Username"
              value1={username}
              label2="Email"
              value2={email}
            />
            <ReadOnlyPair
              label1="Phone"
              value1={phone}
              label2="Full Name"
              value2={fullname}
            />
            <ReadOnlyPair
              label1="Location"
              value1={location}
              label2="GitHub"
              value2={github}
            />
            <ReadOnlyPair
              label1="Portfolio"
              value1={portfolio}
              label2="LinkedIn"
              value2={linkedin}
            />
            <ReadOnlyPair
              label1="Skills"
              value1={skills}
              label2="Tech Stack"
              value2={techstack}
            />

            <div className="mb-3">
              <label className="form-label fw-bold">About</label>
              <p className="form-control-plaintext mb-0">
                {about || "Not specified"}
              </p>
            </div>

            <ReadOnlyPair
              label1="Open to Work"
              value1={openToWork ? "Yes" : "No"}
            />

            {editable && (
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={() => {
                  reset();
                  setIsEditMode(true);
                  setFeedback({ type: "", msg: "" });
                }}
              >
                Edit Profile
              </button>
            )}
          </>
        )}

        {isEditMode && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {EditPair("fullname", "Full Name", "location", "Location")}
            <div className="mb-3">
              <label className="form-label fw-bold">About</label>
              <textarea
                rows="4"
                className="form-control"
                {...register("about")}
              />
            </div>
            {EditPair(
              "github",
              "GitHub URL",
              "portfolio",
              "Portfolio URL",
              "https://github.com/username",
              "https://example.com",
              {
                validate: urlRule(
                  /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/?$/
                ),
              },
              {
                validate: urlRule(/^https?:\/\//),
              }
            )}
            {EditPair(
              "linkedin",
              "LinkedIn URL",
              "skills",
              "Skills",
              "https://linkedin.com/in/username",
              "JavaScript, React",
              {
                validate: urlRule(
                  /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w.-]+\/?$/
                ),
              }
            )}
            {EditPair("techstack", "Tech Stack", null, null)}

            {/* Open to work (single but keeps grid alignment) */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="openToWork"
                    {...register("openToWork")}
                  />
                  <label htmlFor="openToWork" className="form-check-label">
                    Open to Work
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success me-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                reset();
                setIsEditMode(false);
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;

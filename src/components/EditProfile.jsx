import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import { Tuple } from "@reduxjs/toolkit";

const EditProfile = ({ user }) => {
  const [firstName, setFirsttName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    // Clear Error
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-10 mt-8 mb-16 px-4">
      {/* Form */}
      <div className="flex justify-center w-full sm:w-auto">
        <form onSubmit={saveProfile} className="w-full sm:w-96">
          <div className="card card-dash bg-base-300 w-full">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <fieldset className="fieldset">
                {/* First Name */}
                <label className="fieldset-legend">First Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={firstName}
                  onChange={(e) => setFirsttName(e.target.value)}
                />
                {/* Last Name */}
                <label className="fieldset-legend">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {/* Photo URL */}
                <label className="fieldset-legend">Photo Url</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <div className="flex gap-4">
                  {/* Age */}
                  <div className="flex-1">
                    <label className="fieldset-legend">Age</label>
                    <input
                      type="text"
                      className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    {/* Gender */}
                    <label className="fieldset-legend">Gender</label>
                    <select
                      className="select select-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                {/* Skills */}
                <label className="fieldset-legend">Skills</label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                {/* About */}
                <label className="fieldset-legend">About</label>
                <textarea
                  className="textarea w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  type="submit"
                  className="btn w-full btn-primary hover:scale-[1.02] transition-transform mt-4"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* User Card */}
      <div className="w-full sm:w-auto flex justify-center">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoUrl, skills }}
        />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile update successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;

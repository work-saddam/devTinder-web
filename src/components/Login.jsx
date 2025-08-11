import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong!");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center mt-[8%] mb-16">
      <form onSubmit={isLoginForm ? handleLogin : handleSignUp}>
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
            <fieldset className="fieldset">
              {!isLoginForm && (
                <>
                  <label className="fieldset-legend">First Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="fieldset-legend">Last Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <label className="fieldset-legend">Email ID</label>
              <input
                type="email"
                className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <label className="fieldset-legend">Password</label>
              <input
                type="password"
                className="input input-bordered w-full bg-base-100 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                type="submit"
                className="btn w-full btn-primary hover:scale-[1.02] transition-transform mt-4"
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="text-center p-2 cursor-pointer"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm
                ? "New to DevTinder? Sign up now"
                : "Already Registered? Login now"}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

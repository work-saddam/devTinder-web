import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("mark@gmail.com");
  const [password, setPassword] = useState("Saddam@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-[8%]">
      <form onSubmit={handleLogin}>
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <fieldset className="fieldset">
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
            <div className="card-actions justify-center">
              <button
                type="submit"
                className="btn w-full btn-primary hover:scale-[1.02] transition-transform mt-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      // Error Logic maybe redirect to error page.
      console.error(error);
    }
  };

  const closeDropdown = () => {
    const activeElement = document.activeElement;
    if (activeElement) activeElement.blur(); // closes the dropdown
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4 sm:px-6">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl font-bold">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm font-medium">
            Welcome, {user.firstName}
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user profile" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 mt-3 z-[1] p-2 shadow-lg rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} onClick={closeDropdown}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"} onClick={closeDropdown}>
                  Connections
                </Link>
              </li>
              <li>
                <Link to={"/requests"} onClick={closeDropdown}>
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions, showDemoButton }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/send/request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="w-full aspect-square overflow-hidden">
        <img
          src={photoUrl}
          loading="lazy"
          alt="user photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {skills && (
          <p className={`overflow-hidden w-full ${!showActions ? "h-6" : ""}`}>
            {skills}
          </p>
        )}
        <p className={`overflow-hidden w-full ${!showActions ? "h-6" : ""}`}>
          {about}
        </p>

        {showActions && (
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Intersted
            </button>
          </div>
        )}

        {showDemoButton && (
          <p className=" text-center bg-secondary p-2 font-semibold rounded-xs mt-2">
            Replica of your Profile
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;

// Updated UserCard Component
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, showActions, showDemoButton, onAction }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    user;

  const [ignoredToast, setIgnoredToast] = useState(false);
  const [interestedToast, setInterestedToast] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/send/request/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      if (status == "ignored") {
        setIgnoredToast(true);
        setTimeout(() => {
          setIgnoredToast(false);
        }, 2000);
      }
      if (status == "interested") {
        setInterestedToast(true);
        setTimeout(() => {
          setInterestedToast(false);
        }, 2000);
      }

      // Remove current user from feed
      dispatch(removeUserFromFeed(userId));

      // Notify parent to load next user if needed
      if (onAction) {
        onAction();
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <>
      {ignoredToast && (
        <div className="toast toast-top toast-center z-50 animate-fadeInOut">
          <div className="shadow-lg px-4 py-2 rounded-lg bg-primary">
            <span className="font-semibold">Hard Pass</span>
          </div>
        </div>
      )}

      {interestedToast && (
        <div className="toast toast-top toast-center z-50 animate-fadeInOut">
          <div className="shadow-lg px-4 py-2 rounded-lg bg-secondary">
            <span className="font-semibold">You made a move.</span>
          </div>
        </div>
      )}

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
            <p
              className={`overflow-hidden w-full ${!showActions ? "h-6" : ""}`}
            >
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
                Interested
              </button>
            </div>
          )}

          {showDemoButton && (
            <p className="text-center bg-secondary p-2 font-semibold rounded-xs mt-2">
              Replica of your Profile
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserCard;

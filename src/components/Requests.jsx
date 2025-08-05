import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      axios.post(
        BASE_URL + "/send/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.connectionRequests));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-bold text-center my-4">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="card bg-base-300 shadow-md w-[95%] max-w-md mx-auto my-4 p-4"
          >
            <div className="flex justify-center mb-3">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={photoUrl} alt="user" className="object-cover" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-1 mb-4">
              <h2 className="text-lg font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-400">
                  {age}, {gender}
                </p>
              )}
              <p className="text-sm">{about}</p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="btn btn-soft btn-sm btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-soft btn-sm btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

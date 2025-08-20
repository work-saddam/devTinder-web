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
  if (requests.length === 0)
    return (
      <div className="text-center">
        <h3 className="sm:text-3xl text-2xl font-bold py-8">
          No Connection Requests Received!
        </h3>
        <img
          loading="lazy"
          src="/assets/no_request_found.png"
          alt="no request found"
          className="block mx-auto w-100 p-4"
        />
      </div>
    );

  return (
    <div className="mb-4 px-4">
      <h1 className="text-2xl font-bold text-center my-6">Requests</h1>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 bg-base-200 p-4 rounded-xl shadow hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />

              {/* Info & Actions */}
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm">{about}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-error btn-outline btn-sm"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success btn-outline btn-sm"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

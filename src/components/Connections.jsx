import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async (req, res) => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="text-center">
        <h2 className="sm:text-3xl text-2xl font-bold text-neutral-content pt-8">
          No Connections Found!
        </h2>
        <img
          loading="lazy"
          src="/assets/no_connection_found.svg"
          alt="user connection found"
          className="block mx-auto w-96"
        />
      </div>
    );

  return (
    <div className="mb-4 px-4">
      <h1 className="text-2xl font-bold text-center my-6">Connections</h1>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {connections.map((user) => {
          const { _id, firstName, lastName, photoUrl, gender, age, about } =
            user;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 bg-base-200 p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              {/* Avatar */}
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full object-cover"
              />
              {/* Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-400">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm">{about}</p>
              </div>
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-soft btn-warning sm:w-24">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

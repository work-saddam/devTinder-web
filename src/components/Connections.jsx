import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

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
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="mb-16">
      <h1 className="text-2xl font-bold text-center my-4">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex gap-4 m-4 p-4 bg-base-300 rounded-lg w-1/2 mx-auto"
          >
            <div className="w-20 h-20 rounded-full overflow-clip">
              <img src={photoUrl} alt="user photo" className=" rounded-full " />
            </div>
            <div>
              <h3 className="text-lg font-bold pb-2">
                {firstName + " " + lastName}{" "}
              </h3>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

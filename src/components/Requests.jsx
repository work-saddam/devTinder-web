import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

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

      {requests.map((requests) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          requests.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center gap-4 m-4 p-4 bg-base-300 rounded-lg w-2/3 mx-auto"
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
            <div>
              <button className="btn btn-soft btn-error mr-2">Reject</button>
              <button className="btn btn-soft btn-success">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

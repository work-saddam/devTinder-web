import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeet = async () => {
    if (feed) return;
    try {
      const users = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(users?.data?.users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeet();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

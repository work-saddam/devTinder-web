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

  if (!feed) return;
  if (feed.length === 0)
    return (
      <div className="text-center">
        <h2 className="sm:text-3xl text-2xl font-bold text-neutral-content py-8">
          No New Users Found!
        </h2>
        <img
          loading="lazy"
          src="/assets/no-user-found.svg"
          alt="no user found"
          className="block mx-auto w-96"
        />
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center items-center my:0 sm:my-6">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

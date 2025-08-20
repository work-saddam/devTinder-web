// Simple Feed Component - No Page Tracking
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(false);
  const [allUsersExhausted, setAllUsersExhausted] = useState(false);

  const getFeed = async () => {
    if (loading || allUsersExhausted) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/feed?limit=10`, {
        withCredentials: true,
      });

      const newUsers = response?.data?.users || [];
      const pagination = response?.data?.pagination;

      // console.log("Feed response:", {
      //   usersCount: newUsers.length,
      //   hasMore: pagination?.hasMore,
      //   totalUsers: pagination?.totalUsers,
      // });

      if (newUsers.length === 0) {
        setAllUsersExhausted(true);
        console.log("No users returned");
      } else {
        dispatch(addFeed(newUsers));
        setAllUsersExhausted(!pagination?.hasMore);
        // console.log(`Added ${newUsers.length} users to feed`);
      }
    } catch (error) {
      // console.error("Error fetching feed:", error);
      setAllUsersExhausted(true);
    } finally {
      setLoading(false);
    }
  };

  const loadNextUser = () => {
    // When only 1 user left, try to load more
    if (feed && feed.length === 1 && !allUsersExhausted) {
      getFeed();
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Debug logging
  // console.log("Feed state:", {
  //   feedLength: feed?.length,
  //   allUsersExhausted,
  //   loading,
  // });

  if (loading && (!feed || feed.length === 0)) {
    return (
      <div className="flex justify-center items-center my-6">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    if (allUsersExhausted) {
      return (
        <div className="text-center">
          <h2 className="sm:text-3xl text-2xl font-bold py-8">
            You've seen all available users!
          </h2>
          <p className="text-lg mb-4">Check back later for new profiles</p>
          <img
            loading="lazy"
            src="/assets/no-user-found.svg"
            alt="no more users"
            className="block mx-auto w-96"
          />
        </div>
      );
    }

    return (
      <div className="text-center">
        <h2 className="sm:text-3xl text-2xl font-bold py-8">
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
  }

  return (
    <div className="flex justify-center items-center my-0 sm:my-6">
      <UserCard
        user={feed[0]}
        showActions={true}
        showDemoButton={false}
        onAction={loadNextUser}
      />
    </div>
  );
};

export default Feed;

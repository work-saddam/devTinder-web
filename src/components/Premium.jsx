import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });
      if (res?.data?.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      //It should open razorpay dialog box
      const { keyId, amount, currency, notes, orderId } = order?.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev-Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },

        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return isUserPremium ? (
    <div>
      <p className="text-2xl font-medium text-center mt-6">
        You are already a premium user!!
      </p>
    </div>
  ) : (
    <div className="flex my-16 w-full flex-col lg:flex-row px-8">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h3 className="font-medium text-2xl">Silver Membership</h3>
        <ul className="">
          <li>- Chat with other peoples.</li>
          <li>- 100 Connection requests per day.</li>
          <li>- Blue Tick.</li>
          <li>- 3 Months.</li>
        </ul>
        <button
          className="px-5 py-2 bg-sky-600 rounded-lg cursor-pointer"
          onClick={() => handleBuyClick("silver")}
        >
          Buy Silver
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h3 className="font-medium text-2xl">Gold Membership</h3>
        <ul className="">
          <li>- Chat with other peoples.</li>
          <li>- 1000 Connection requests per day.</li>
          <li>- Blue Tick.</li>
          <li>- 6 Months.</li>
        </ul>
        <button
          className="px-5 py-2 bg-amber-500 rounded-lg cursor-pointer"
          onClick={() => handleBuyClick("gold")}
        >
          Buy Gold
        </button>
      </div>
    </div>
  );
};

export default Premium;

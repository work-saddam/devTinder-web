import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-6 prose">
        <h1 className="font-semibold text-2xl mb-4">Privacy Policy</h1>
        <p className="mb-2">
          <strong>Effective Date:</strong> July 10, 2025
        </p>
        <p>
          DevTinder (“we”, “our”, “us”) operates the website{" "}
          <a href="https://devtinder-chi.vercel.app" className="link">
            https://devtinder-chi.vercel.app
          </a>
          . This Privacy Policy explains how we collect, use, and protect your
          information.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">
          Information We Collect
        </h2>
        <ul>
          <li>Personal info: name, email, phone number, profile details.</li>
          <li>Usage data: IP, browser type, device info, analytics.</li>
          <li>
            Payment data: processed securely via Razorpay; we don’t store card
            details.
          </li>
        </ul>

        <h2 className="font-semibold text-xl mt-4 mb-2">How We Use Data</h2>
        <ul>
          <li>To manage accounts and improve experience.</li>
          <li>To communicate updates and security alerts.</li>
          <li>For analytics and legal compliance.</li>
        </ul>

        <h2 className="font-semibold text-xl mt-4 mb-2">Data Sharing</h2>
        <p>
          We do not sell or rent user data. Limited data may be shared with
          Razorpay, hosting providers, or analytics tools.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">User Rights</h2>
        <ul>
          <li>Access, modify, or delete your data anytime.</li>
          <li>
            Withdraw consent by contacting us at work.saddam786@gmail.com.
          </li>
        </ul>

        <h2 className="font-semibold text-xl mt-4 mb-2">Cookies</h2>
        <p>We use cookies to enhance app performance and analytics.</p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Contact</h2>
        <p>
          For any queries: <strong>work.saddam786@gmail.com</strong>
          <br />
          DevTinder, Chennai, Tamil Nadu, India – 600003
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

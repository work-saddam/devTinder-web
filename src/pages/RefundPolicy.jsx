import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-6 prose">
        <h1 className="font-semibold text-2xl mb-4">Refund Policy</h1>
        <p>
          <strong>Effective Date:</strong> July 10, 2025
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Overview</h2>
        <p>
          All digital purchases made on DevTinder are non-refundable except in
          specific cases such as duplicate or failed transactions.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">
          Eligible Refund Cases
        </h2>
        <ul>
          <li>Duplicate payments.</li>
          <li>Technical error during payment processing.</li>
        </ul>

        <h2 className="font-semibold text-xl mt-4 mb-2">
          How to Request a Refund
        </h2>
        <p>
          Email <strong>work.saddam786@gmail.com</strong> within 7 days of
          payment. Approved refunds will be processed within 5–7 business days
          via the original payment method.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Note</h2>
        <p>
          No cash or manual refunds will be provided. All refunds are handled
          through Razorpay.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Contact</h2>
        <p>
          For assistance, reach us at: <strong>work.saddam786@gmail.com</strong>
          <br />
          DevTinder, Chennai, Tamil Nadu, India – 600003
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;

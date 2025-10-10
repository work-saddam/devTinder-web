import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-base-200 flex justify-center p-6">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-6 prose">
        <h1 className="font-semibold text-2xl mb-4">Terms and Conditions</h1>
        <p>
          <strong>Effective Date:</strong> July 10, 2025
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Acceptance</h2>
        <p>
          By using DevTinder, you agree to follow these Terms and all applicable
          laws.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Service Description</h2>
        <p>
          DevTinder is a networking platform for developers to connect, chat,
          and collaborate.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Eligibility</h2>
        <p>Users must be at least 16 years old to register.</p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Prohibited Actions</h2>
        <ul>
          <li>Posting illegal or abusive content.</li>
          <li>Using the platform for spam or harassment.</li>
          <li>Attempting to hack or disrupt services.</li>
        </ul>

        <h2 className="font-semibold text-xl mt-4 mb-2">Payments</h2>
        <p>
          Payments (if applicable) are securely processed via Razorpay. We don’t
          store payment details.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">
          Intellectual Property
        </h2>
        <p>
          All platform content and code belong to DevTinder. Reproduction
          without permission is prohibited.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Termination</h2>
        <p>
          We may suspend accounts violating our terms or engaging in abusive
          behavior.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Disclaimer</h2>
        <p>
          DevTinder is provided “as is” without warranties. We aren’t liable for
          user content or downtime.
        </p>

        <h2 className="font-semibold text-xl mt-4 mb-2">Governing Law</h2>
        <p>
          Governed by Indian law; disputes subject to courts in Chennai, Tamil
          Nadu, India.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

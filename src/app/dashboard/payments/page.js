"use client";
import React from "react";
import axios from "axios";

import { Button } from "antd";

import { loadScript } from "@/utils/helpers";
function App() {
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 500,
      currency: "INR",
      name: "Soumya Corp.",
      description: "Test Transaction",
      order_id: "order_NSZOsL9TAdZifp",
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("/payment/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "<YOUR NAME>",
        email: "example@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Example Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <Button type="primary" onClick={displayRazorpay}>
        Pay ₹500
      </Button>
    </div>
  );
}

export default App;

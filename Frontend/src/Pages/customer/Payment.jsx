
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setSubscription, resetSubscription } from "../../features/paymentSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const plans = [
  { id: "daily", name: "Daily Plan", price: 100, ads: 5, duration: "1 Day" },
  { id: "monthly", name: "Monthly Plan", price: 500, ads: 50, duration: "30 Days" },
  { id: "threeMonth", name: "3-Month Plan", price: 1500, ads: 150, duration: "90 Days" },
  { id: "yearly", name: "Yearly Plan", price: 5000, ads: 500, duration: "365 Days" },
];

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPlan = useSelector((state) => state.payment.subscriptionPlan);
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (plan) => {
    if (currentPlan) {
      const confirmSwitch = window.confirm(
        `You already have an active ${currentPlan}. If you proceed, your previous subscription will be lost. Do you want to continue?`
      );
      if (!confirmSwitch) return;
    }

    try {
      setLoadingPlanId(plan.id);
      dispatch(resetSubscription());

      const response = await axiosInstance.post("/payment/create-payment", {
        amount: plan.price,
        plan: plan.id,
        receipt: `txn_${Date.now()}`,
        success_url: window.location.origin + "/customer/add-ad",
        cancel_url: window.location.origin + "/customer/payment",
      });

      const orderId = response.data.orderId;

      const options = {
        key: "rzp_test_fnC1AT0ORc8NRp",
        amount: plan.price * 100,
        currency: "INR",
        name: "Digital Ads",
        description: `Purchase ${plan.name}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            await axiosInstance.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan.id,
              amount: plan.price,
            });

            // const updatedSubscription = await axiosInstance.get("/customer/subscription-details");
            // dispatch(setSubscription(updatedSubscription.data));
            // console.log("setSubscription", updatedSubscription.data);
            
            toast.success("Payment successful! Subscription activated.");
            navigate("/customer/create-ad");
          } catch (error) {
            console.error("Verification failed", error);
            toast.error("Payment verification failed! Please contact support.");
          } finally {
            setLoadingPlanId(null);
          }
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Something went wrong while initiating payment.");
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white p-6 shadow-lg rounded-lg text-center border-2 ${
              plan.id === "yearly" ? "border-yellow-500" : "border-transparent"
            }`}
          >
            {plan.id === "yearly" && (
              <p className="text-xs font-semibold text-yellow-600 mb-1">🔥 Most Value</p>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">₹{plan.price}</p>
            <p className="text-sm text-gray-500">{plan.ads} Ads Included</p>
            <p className="text-sm text-gray-500 mb-4">Valid for {plan.duration}</p>
            <button
              onClick={() => handlePayment(plan)}
              disabled={loadingPlanId === plan.id}
              className={`w-full py-2 px-4 rounded-lg transition ${
                loadingPlanId === plan.id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loadingPlanId === plan.id ? "Processing..." : "Select Plan"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

export default Payment;
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const plans = [
  { id: "daily", name: "Daily Plan", price: 100, ads: 1, duration: "1 Day" },
  { id: "monthly", name: "Monthly Plan", price: 500, ads: 10, duration: "30 Days" },
  { id: "threeMonth", name: "3-Month Plan", price: 1000, ads: 30, duration: "90 Days" },
  { id: "yearly", name: "Yearly Plan", price: 2000, ads: 50, duration: "365 Days" },
];

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = async (plan) => {
    try {
      const response = await axiosInstance.post("/customer/razorpay/initiate", {
        amount: plan.price,
        plan: plan.id,
        success_url: window.location.origin + "/add-ad",
        cancel_url: window.location.origin + "/payment",
      });

      const orderId = response.data.orderId;
      
      // Initialize Razorpay Payment
      const options = {
        key: "rzp_test_fnC1AT0ORc8NRp", // Use your Razorpay Key
        amount: plan.price * 100,
        currency: "INR",
        name: "Digital Ads",
        description: `Purchase ${plan.name}`,
        order_id: orderId,
        handler: function (response) {
          axiosInstance.post("/customer/razorpay/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan: plan.id,
          }).then(() => {
            navigate("/customer/my-ads");
          }).catch(() => {
            alert("Payment verification failed!");
          });
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">₹{plan.price}</p>
            <p className="text-sm text-gray-500">{plan.ads} Ads Included</p>
            <p className="text-sm text-gray-500 mb-4">Valid for {plan.duration}</p>
            <button
              onClick={() => handlePayment(plan)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;

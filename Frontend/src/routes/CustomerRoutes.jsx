import { Routes, Route } from "react-router-dom";
import CustomerDashbord from "../Pages/customer/CustomerDashbord";
import AddAd from "../Pages/customer/AddAd";
import MyAds from "../Pages/customer/MyAds";

const CustomerRoutes = () => {
  return (
<Routes>
<Route path="/" element={<CustomerDashbord />} />
<Route path="/create-ad" element={<AddAd />} />
<Route path="/my-ads" element={<MyAds />} />

</Routes>
  )
}

export default CustomerRoutes
import axiosInstance from "./axiosInstance";

// ✅ Signup API
export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const verifyOTP = async (data) => {
    try {
        const response = await axiosInstance.post("/auth/verify-otp", data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
        
    }
    
  };
  
  // ✅ Add resend OTP API
  export const resendOTP = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/resend-otp", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }   
    
  };
// ✅ Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Email Verification API
export const verifyEmail = async (token) => {
  try {
    const response = await axiosInstance.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Something went wrong!";
  }
};

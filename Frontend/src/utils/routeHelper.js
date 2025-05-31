export const getDashboardRoute = (role) => {
  console.log("User role:", role); // Debugging log
  switch (role) {
    case "admin":
      return "/admin";
    case "customer":
      return "/customer";
    case "user":
      return "/user/home";
    default:
      return "/login";
  }
};
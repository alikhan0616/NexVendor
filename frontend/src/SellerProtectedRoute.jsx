import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ isSeller, children }) => {
  const { isLoading } = useSelector((state) => state.seller);

  console.log("isLoading:", isLoading, "isSeller:", isSeller);

  if (isLoading) {
    return null;
  }

  if (!isSeller) {
    return <Navigate to={`/`} replace />;
  }
  return children;
};

export default SellerProtectedRoute;

import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isSeller, isLoading]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;

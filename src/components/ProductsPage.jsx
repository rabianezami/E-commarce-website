import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ProductsBase } from "./ProductsBase";
import CheckoutModal from "./CheckoutModal";

export function ProductsPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const layout = searchParams.get("layout") || "grid"; // پیش‌فرض گرید

  return (
    <>
      <CheckoutModal />
      <ProductsBase category={category || "all"} layout={layout} />
    </>
  );
}

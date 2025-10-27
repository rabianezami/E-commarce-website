// Products.jsx
import React from "react";
import { ProductsBase } from "./ProductsBase";

export default function Products({ category = "all" }) {
  const categories = ["men", "women", "kids"];
  return (
    <>
      {categories.map(cat => (
        <ProductsBase key={cat} category={cat} layout="scroll" />
      ))}
    </>
  );
}

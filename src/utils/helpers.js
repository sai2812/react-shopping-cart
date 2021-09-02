export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(number / 100);
};

export const getUniqueValues = (allProducts, category) => {
  let filterdValues = allProducts.map((product) => product[category]);
  if (category === "colors") {
    filterdValues = filterdValues.flat();
  }
  return ["all", ...new Set(filterdValues)];
};

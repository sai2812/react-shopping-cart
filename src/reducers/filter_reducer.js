import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let temp_products = [...filtered_products];

    if (sort === "price-lowest") {
      temp_products = temp_products.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      temp_products = temp_products.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      temp_products = temp_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === "name-z") {
      temp_products = temp_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return { ...state, filtered_products: temp_products };
  }

  if (action.type === UPDATE_FILTERS) {
    let { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    console.log("filter products");
    const { all_products } = state;
    const { text, company, category, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }

    if (company !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.company.toLowerCase() === company.toLowerCase()
      );
    }

    if (category !== "all") {
      tempProducts = tempProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (color !== "all") {
      tempProducts = tempProducts.filter((product) =>
        product.colors.includes(color)
      );
    }

    tempProducts = tempProducts.filter((product) => product.price <= price);

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

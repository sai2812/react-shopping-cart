import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

// import {
//   About,
//   CartPage,
//   CheckoutPage,
//   Home,
//   ProductsPage,
//   SingleProductPage,
//   ErrorPage,
// } from "./pages";

import Loading from "./components/Loading";

const Home = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/AboutPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const SingleProductPage = lazy(() => import("./pages/SingleProductPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route
            exact
            path="/products/:id"
            children={<SingleProductPage />}
          ></Route>
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Route exact path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;

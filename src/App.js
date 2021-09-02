import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  About,
  CartPage,
  CheckoutPage,
  Home,
  ProductsPage,
  SingleProductPage,
  ErrorPage,
} from "./pages";
function App() {
  return (
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
  );
}

export default App;

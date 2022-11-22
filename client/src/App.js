import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetail";
import Products from "./component/layout/Product/Products";
// import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
// import Search from "./component/layout/Search/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
// import Profile from "./component/User/Profile";
import Profile from "./pages/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./pages/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./pages/Cart/OrderSuccess";
import MyOrders from "./pages/Order/MyOrders";
// import OrderDetails from "./component/Order/OrderDetails";
import OrderDetails from "./pages/Order/OrderDetails";
import Contact from "./pages/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import Register from "./component/User/Register";
import Topbar from "./component/layout/topbar/Topbar";
import TopbarMb from "./component/layout/topbar/TopbarMb";
import ChangePassword from "./pages/User/ChangePassword";
import OrderCash from "./pages/Cart/OrderCash";
import OrderDetailSys from "./pages/Order/OrderDetailSys";
import MyOrderSys from "./pages/Order/MyOrderSys";
import News from "./pages/News/News";
import NewFeedDetails from "./pages/News/NewFeedDetails";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      {/* {isAuthenticated && <UserOptions user={user} />} */}
      {/* <Header /> */}
      <TopbarMb />
      <Topbar />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/new/:id" component={NewFeedDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />
        <Route exact path="/news" component={News} />
        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={ChangePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/cart" component={Cart} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/orderCash" component={OrderCash} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/ordersSys" component={MyOrderSys} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute exact path="/orderSys/:id" component={OrderDetailSys} />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;

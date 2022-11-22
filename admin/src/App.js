import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { loadUser } from "./actions/userAction";
import store from "./store";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Dashboard from "./views/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import FixedPlugin from "./components/FixedPlugin/FixedPlugin";
import sidebarImage from "assets/img/sidebar-3.jpg";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Footer from "./components/Footer/Footer";
import LoginSignUp from "./components/User/LoginSignUp";
import routes from "routes.js";
import UserProfile from "./views/UserProfile";
import TableList from "./views/TableList";
import UserList from "./views/User/UserList";
import UserUpdate from "./views/User/UserUpdate";
import Icons from "./views/Icons";
import Products from "./views/Products/Products";
import CreateProduct from "./views/Products/CreateProduct";
import UpdateProduct from "./views/Products/UpdateProduct";
import CreateUser from "./views/User/CreateUser";
import OrderList from "./views/Orders/OrderList";
import ProcessOrder from "./views/Orders/ProcessOrder";
import OrderDetail from "./views/Orders/OrderDetail";
import BrandList from "./views/Brand/BrandList";
import CreateBrand from "./views/Brand/CreateBrand";
import BrandUpdate from "./views/Brand/BrandUpdate";
import NewFeeds from "./views/NewFeed/NewFeeds";
import CreateNewFeed from "./views/NewFeed/CreateNewFeed";
import UpdateNewFeed from "./views/NewFeed/UpdateNewFeed";
import Coupons from "./views/Coupon/Coupons";
import CreateCoupon from "./views/Coupon/CreateCoupon";
import Feedback from "./views/Feedback/Feedback";
import FeedbackDetail from "./views/Feedback/FeedbackDetail";
import OrderListCash from "./views/Orders/OrderListCash";
import OrderDetailCash from "./views/Orders/OrderDetailCash";
import Statistical from "./views/Statistical/Statistical";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [color, setColor] = React.useState("black");
  const [image, setImage] = React.useState(sidebarImage);
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      {isAuthenticated}

      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />

        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/dashboard"
                component={Dashboard}
              />
              <Route exact path="/login" component={LoginSignUp} />
              <ProtectedRoute
                exact
                path="/admin/user/:id"
                isAdmin={true}
                component={UserUpdate}
              />
              <ProtectedRoute
                exact
                path="/admin/products"
                isAdmin={true}
                component={Products}
              />
              <ProtectedRoute
                exact
                path="/admin/brands"
                isAdmin={true}
                component={BrandList}
              />
              <ProtectedRoute
                exact
                path="/admin/orders"
                isAdmin={true}
                component={OrderList}
              />
              <ProtectedRoute
                exact
                path="/admin/statistical"
                isAdmin={true}
                component={Statistical}
              />
              <ProtectedRoute
                exact
                path="/admin/ordersCash"
                isAdmin={true}
                component={OrderListCash}
              />
              <ProtectedRoute
                exact
                path="/admin/orderCash/:id"
                isAdmin={true}
                component={OrderDetailCash}
              />
              <ProtectedRoute
                exact
                path="/admin/newFeed-List"
                isAdmin={true}
                component={NewFeeds}
              />
              <ProtectedRoute
                exact
                path="/admin/feedbacks"
                isAdmin={true}
                component={Feedback}
              />
              <ProtectedRoute
                exact
                path="/admin/coupons"
                isAdmin={true}
                component={Coupons}
              />
              <ProtectedRoute
                exact
                path="/admin/createNewFeed"
                isAdmin={true}
                component={CreateNewFeed}
              />
              <ProtectedRoute
                exact
                path="/admin/createCoupon"
                isAdmin={true}
                component={CreateCoupon}
              />
              <ProtectedRoute
                exact
                path="/admin/newFeed/:id"
                isAdmin={true}
                component={UpdateNewFeed}
              />
              <ProtectedRoute
                exact
                path="/admin/feedback/:id"
                isAdmin={true}
                component={FeedbackDetail}
              />
              <ProtectedRoute
                exact
                path="/admin/createProduct"
                isAdmin={true}
                component={CreateProduct}
              />
              <ProtectedRoute
                exact
                path="/admin/createBrand"
                isAdmin={true}
                component={CreateBrand}
              />
              <ProtectedRoute
                exact
                path="/admin/product/:id"
                isAdmin={true}
                component={UpdateProduct}
              />
              <ProtectedRoute
                exact
                path="/admin/brand/:id"
                isAdmin={true}
                component={BrandUpdate}
              />
              <ProtectedRoute
                exact
                path="/admin/icons"
                isAdmin={true}
                component={Icons}
              />
              <ProtectedRoute exact path="/admin/table" component={TableList} />
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/users"
                component={UserList}
              />
              {/* <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/users"
                component={UserList}
              /> */}
              <ProtectedRoute
                isAdmin={true}
                exact
                path="/admin/createUser"
                component={CreateUser}
              />
              <ProtectedRoute
                exact
                path="/admin/order/:id"
                isAdmin={true}
                component={ProcessOrder}
              />
              <ProtectedRoute
                exact
                path="/admin/orderDetail/:id"
                isAdmin={true}
                component={OrderDetail}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
      {/* <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color) => setColor(color)}
          image={image}
          setImage={(image) => setImage(image)}
        /> */}
      {/* {isAuthenticated && <UserOptions user={user} />} */}
    </Router>
  );
};

export default App;

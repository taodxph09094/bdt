const express = require("express");
const {
  createOrderSystem,
  getOrderSystem,
  updateOrderSystem,
  deleteOrderSystem,
  getSingleOrderSystem,
  myOrdersSys,
} = require("../controllers/orderSystemController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/orderSys/new").post(isAuthenticatedUser, createOrderSystem);
router.route("/ordersSys/me").get(isAuthenticatedUser, myOrdersSys);

router
  .route("/admin/ordersSystem")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getOrderSystem);
router
  .route("/admin/ordersSystem/detail/:id")
  .get(isAuthenticatedUser, getSingleOrderSystem);
router
  .route("/admin/ordersSystem/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderSystem)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrderSystem);

module.exports = router;

const express = require("express");
const {
  createStatistical,
  getAdminStatisticalDetails,
  getAdminStatistical,
  deleteStatistical,
} = require("../controllers/statisticalController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router
  .route("/admin/statistical/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createStatistical);
router
  .route("/admin/statistical")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminStatistical);
router
  .route("/admin/statistical/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminStatisticalDetails)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteStatistical);

module.exports = router;

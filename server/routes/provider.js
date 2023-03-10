const express = require("express");
const {
  createProvider,
  updateProvider,
  deleteProvider,
  getProvider,
} = require("../controllers/provider");
const router = express.Router();

router.route("/").get(getProvider).post(createProvider);

router.route("/:id").put(updateProvider).delete(deleteProvider);

module.exports = router;

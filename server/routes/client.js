const express = require("express");
const {
  createClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/client");
const router = express.Router();

router.route("/").get(getClient).post(createClient);

router.route("/:id").put(updateClient).delete(deleteClient);

module.exports = router;

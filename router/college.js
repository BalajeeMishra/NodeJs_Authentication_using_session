const express = require("express");
const router = express.Router();
const isLoggedIn = require("../helper/authcheck");
const {addInformation,getInformation} = require("../controller/college");

router.post("/adddata",isLoggedIn,addInformation);
router.get("/getdata",isLoggedIn,getInformation);

module.exports = router;
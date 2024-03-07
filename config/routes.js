var express = require("express");
var VerifyToken = require("../VerifyToken");
const { userDataValidateChainMethod } = require("./user.validation");

var router = express.Router();


module.exports = function(app, passport) {

//user routes
var users = require('../controllers/users');
router.post("/api/registerUser", userDataValidateChainMethod, users.create);
router.get("/api/listusers",VerifyToken, users.all);
router.get("/api/editUser/:id",VerifyToken, users.show);
router.put("/api/updateUser", users.update);
router.delete("/api/deleteUser/:id", users.destroy);
router.post("/api/loginUser", function (req, res, next) {
    users.signin(req, res, next, passport);
    
});


//item routes
var item = require("../controllers/itemController");
router.post("/api/addItem",VerifyToken,item.create);
router.get("/api/listitems",VerifyToken, item.all);


//admin routes
var admin = require('../controllers/admin');
router.post("/api/registerAdmin",admin.create);
router.post("/api/loginAdmin", function (req, res, next) {
    users.signin(req, res, next, passport);
    
});
router.get("/api/listusersPage/:pageno/:displayperpage", admin.all);

router.get("/api/logout", admin.logout);






return router;
}
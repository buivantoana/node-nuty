import express from "express";
let router = express.Router();
import homecontroler from "../controler/homecontroler";
var cookieParser = require("cookie-parser");

const initwed = (app) => {
  // Admin

  router.post("/addcategory", homecontroler.addcategory);
  router.post("/updatecategory", homecontroler.updatecategory);
  router.post("/deletecategory", homecontroler.deletecategory);
  router.get("/getcategory", homecontroler.getcategory);
  router.post("/addrole", homecontroler.addrole);
  router.post("/updaterole", homecontroler.updaterole);
  router.get("/getrole", homecontroler.getrole);
  router.post("/getroletype", homecontroler.getroletype);
  router.post("/getbrand", homecontroler.getbrand);
  router.post("/addbrand", homecontroler.addbrand);
  router.post("/updatebrand", homecontroler.updatebrand);
  router.post("/gettypebrand", homecontroler.gettypebrand);
  router.post("/addproduct", homecontroler.addproduct);
  router.post("/updateproduct", homecontroler.updateproduct);
  router.post("/getproduct", homecontroler.getproduct);
  router.post("/getproductcategory", homecontroler.getproductcategory);
  router.post("/getproductitem", homecontroler.getproductitem);
  router.post("/adddetailimg", homecontroler.adddetailimg);
  router.post("/adddetaildes", homecontroler.adddetaildes);
  router.post("/getdetailimg", homecontroler.getdetailimg);
  router.post("/getdetaildes", homecontroler.getdetaildes);

  router.post("/adduser", homecontroler.adduser);
  router.post("/loginuser", homecontroler.loginuser);
  router.get("/logoutuser", homecontroler.logoutuser);
  router.get("/authentication", homecontroler.authentication);
  router.post("/addcart", homecontroler.addcart);
  router.post("/deletecart", homecontroler.deletecart);
  router.post("/getcart", homecontroler.getcart);
  router.post("/updatecart", homecontroler.updatecart);
  router.post("/addorder", homecontroler.addorder);
  router.post("/getorder", homecontroler.getorder);
  router.post("/deleteorder", homecontroler.deleteorder);
  router.post("/addstar", homecontroler.addstar);
  router.post("/addcomment", homecontroler.addcomment);
  router.post("/getcomment", homecontroler.getcomment);
  router.post("/updatecomment", homecontroler.updatecomment);
  router.post("/destroycomment", homecontroler.destroycomment);
  router.post("/addcommentchild", homecontroler.addcommentchild);
  router.post("/deletecommentchild", homecontroler.deletecommentchild);
  router.post("/deleteallcommentchild", homecontroler.deleteallcommentchild);
  router.get("/getallproductpresent", homecontroler.getallproductpresent);
  router.post("/addpresent", homecontroler.addpresent);
  router.post("/searchproduct", homecontroler.searchproduct);
  router.post("/getsaleproduct", homecontroler.getsaleproduct);
  router.post("/addcategorymagazile", homecontroler.addcategorymagazile);
  router.get("/getcategorymagazile", homecontroler.getcategorymagazile);
  router.post("/addmagazile", homecontroler.addmagazile);
  router.get("/getmagazile", homecontroler.getmagazile);
  router.post("/getbrandproduct", homecontroler.getbrandproduct);
  return app.use("/", router);
};

export default initwed;

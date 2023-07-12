
const express= require("express")
const router= express.Router()
const {register, login,getUser,updateUser}= require("../controller/UserController")
const authenticate= require("../middleware/authentication")
const authorise= require("../middleware/authorization")
const { createProduct,getProduct, getProductById,updateProduct,deleteProductId } = require("../controller/productController")
const {createCart,updateCart,getCart,deleteCart}=require("../controller/cartController")
const {createOrder,updateOrder}=require("../controller/orderController")


//User API

router.post("/register",register)
router.post("/login",login)
router.get("/user/:userId/profile",authenticate,authorise,getUser)
router.put("/user/:userId/profile",authenticate,authorise,updateUser)

//=======
router.post("/Products",createProduct)
router.get("/Products",getProduct)
router.get("/Products/:ProductId",getProductById)
router.put("/Products/:ProductId",updateProduct)
router.delete("/products/:ProductId",deleteProductId)



//======================================= cartController ========================================================//

router.post("/users/:userId/cart", authenticate, authorise,   createCart );
router.put("/users/:userId/cart",  authenticate, authorise, updateCart );
router.get("/users/:userId/cart",  authenticate, authorise, getCart );
router.delete("/users/:userId/cart", authenticate, authorise, deleteCart );

//======================================= orderController=========================================================//

router.post("/users/:userId/orders", authenticate,authorise, createOrder );
router.put("/users/:userId/orders",  authenticate, authorise, updateOrder );

module.exports = router
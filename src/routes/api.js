const express = require('express');
const router = express.Router();
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware');
const UsersController = require('../controllers/users/UsersController');
const BrandController = require('../controllers/brands/BrandsController');
const CategoriesController = require('../controllers/categories/CategoriesController');
const ProductsController = require('../controllers/products/ProductsController');
const BillingController = require('../controllers/billingController/BillingController');
const { setSslCommerz } = require('../utility/sslCommerz');
const OrderController = require('../controllers/orderController/orderController')
const ReviewController = require('../controllers/reviewController/ReviewController');
const { upload } = require('../helper/fileHelper');



// User Profile Routes 
router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);
router.get("/recoverEmailVerify/:email",UsersController.recoverEmailVerify);
router.get("/recoverOtpVerify/:email/:otp",UsersController.recoverOtpVerify);
router.post("/recoverResetPassword",UsersController.recoverResetPassword);
router.get('/UserList/:pageNo/:perPage/:search',AuthVerifyMiddleware,UsersController.UserList);
router.get('/dropdownUser',AuthVerifyMiddleware,UsersController.dropdownUser);
router.post('/makeAdmin/:id',AuthVerifyMiddleware,UsersController.makeAdmin)
router.get('/adminUserList/:pageNo/:perPage/:search',AuthVerifyMiddleware,UsersController.adminUserList)
// router.get("/getUserWithBillingAddress",AuthVerifyMiddleware,UsersController.getUserWithBillingAddress)

// billing routes
router.post("/createBillingAddress",AuthVerifyMiddleware,BillingController.createBillingAddress)
router.post("/updateBillingAddress/:id",AuthVerifyMiddleware,BillingController.updateBillingAddress)
router.get("/dropdownBillingAddress",AuthVerifyMiddleware,BillingController.dropdownBillingAddress)
router.get("/getUserWithBilling",AuthVerifyMiddleware,BillingController.getUserWithBilling)


// brand routes
router.post("/createBrand",AuthVerifyMiddleware,BrandController.createBrand);
router.post("/updateBrand/:id",AuthVerifyMiddleware,BrandController.updateBrand);
router.get("/brandList/:pageNo/:perPage/:search",AuthVerifyMiddleware,BrandController.brandList);
router.get("/dropdownBrand",BrandController.dropdownBrand);
router.get('/brandDelete/:id',AuthVerifyMiddleware,BrandController.brandDelete)
router.get('/brandDetailsById/:id',AuthVerifyMiddleware,BrandController.brandDetailsById)

// categories routes
router.post("/createCategories",AuthVerifyMiddleware,CategoriesController.createCategories);
router.post("/updateCategories/:id",AuthVerifyMiddleware,CategoriesController.updateCategories);
router.get("/categoriesList/:pageNo/:perPage/:search",AuthVerifyMiddleware,CategoriesController.categoriesList);
router.get("/dropdownCategories",CategoriesController.dropdownCategories);
router.get('/categoriesDelete/:id',AuthVerifyMiddleware,CategoriesController.categoriesDelete)
router.get('/categoryDetailsById/:id',AuthVerifyMiddleware,CategoriesController.categoryDetailsById)


// products 
router.post("/createProducts",AuthVerifyMiddleware,upload.array('files'),ProductsController.createProducts);
router.post("/updateProducts/:id",AuthVerifyMiddleware,ProductsController.updateProducts);
router.get("/productsList/:pageNo/:perPage/:search",ProductsController.productsList);
router.get('/productsDelete/:id',AuthVerifyMiddleware,ProductsController.productsDelete)
router.get('/productDetailsById/:id',ProductsController.productDetailsById)
router.get('/productFilterByCategory/:pageNo/:perPage/:category',ProductsController.productFilterByCategory)
router.get('/productFilterByBrand/:pageNo/:perPage/:brand',ProductsController.productFilterByBrand)
router.get('/getProducts',ProductsController.getProducts);
router.post('/singleFile',upload.single('file'),ProductsController.singleFileUpload)

// review 
router.post('/createReview',AuthVerifyMiddleware,ReviewController.createReview);


// ssl commerz 
router.post('/init',setSslCommerz)
router.post('/success',OrderController.successPayment)
router.post('/cancel',OrderController.cancelPayment)
router.post('/fail',OrderController.failPayment)
router.get('/OrderDetails',AuthVerifyMiddleware,OrderController.OrderDetails)
router.get('/orderDetailsById/:id',AuthVerifyMiddleware,OrderController.orderDetailsById)


// manage orders
router.get('/ordersList/:pageNo/:perPage/:search',AuthVerifyMiddleware,OrderController.ordersList) 
router.post('/orderChangeStatus/:id',AuthVerifyMiddleware,OrderController.orderChangeStatus)
router.get('/deleteOrder/:id',AuthVerifyMiddleware,OrderController.deleteOrder)

module.exports = router;
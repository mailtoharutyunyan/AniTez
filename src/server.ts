import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/Logger'

import UserController from './controller/impl/user/UserController';
import AuthenticationController from './controller/impl/user/AuthenticationController';
import ProductCategoryController from './controller/impl/product-category/ProductCategoryController';
import ProductController from './controller/impl/product/ProductController';

const app = new App({
    port: 5555,
    controllers: [
        new UserController(),
        new AuthenticationController(),
        new ProductCategoryController(),
        new ProductController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware,
        // ValidationResult,
        // TokenValidator
    ]
});

app.listen();

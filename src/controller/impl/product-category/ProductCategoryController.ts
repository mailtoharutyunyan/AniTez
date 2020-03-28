import IControllerBase from '../../spec/IControllerBase.interface';
import * as express from 'express';
import { Response } from 'express';
import ProductCategoryService from '../../../service/ProductCategoryService';
import ResponseManager from '../../../managers/ResponseManager';
import ValidationResult from '../../../middleware/ValidationResult';
import TokenValidator from '../../../middleware/TokenValidator';
import { mult } from '../../../middleware/ImageMiddleware';

class ProductCategoryController implements IControllerBase {

    private path = '/product-category';
    private router = express.Router();
    private productCategoryService;

    constructor() {
        this.initRoutes();
        this.productCategoryService = new ProductCategoryService();
    }

    initRoutes(): any {
        this.router.post(this.path, mult.single('productCategoryImage'), ValidationResult, TokenValidator(),
            this.createProductCategory);
        this.router.get(this.path, ValidationResult, TokenValidator(), this.userProductCategories);
        this.router.get(this.path+"/all", this.allProductCategories);

    }

    private createProductCategory = async (req: any, res: any) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.createProductCategory(
            req.body.productCategoryName,
            req.file,
            req.session.uid,
            responseHandler
        );
        res.status(201).json(productCategory);
    };

    private userProductCategories = async (req: any, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.getUserProductCategories(req.session.uid, responseHandler);
        res.status(200).json(productCategory);

    };

    private allProductCategories = async (req: any, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let productCategory = await this.productCategoryService.getAllProductCategories(req, responseHandler);
        res.status(200).json(productCategory);
    }


}

export default ProductCategoryController;

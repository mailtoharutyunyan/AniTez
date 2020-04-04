import IControllerBase from '../../spec/i-base-controller';
import * as express from 'express';
import { Response } from 'express';
import ProductCategoryService from '../../../service/product-category-service';
import ResponseManager from '../../../managers/response-manager';
import ValidationResult from '../../../middleware/validation-result';
import TokenValidator from '../../../middleware/token-validator';
import { mult } from '../../../middleware/image-middleware';

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

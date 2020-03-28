import IControllerBase from '../../spec/IControllerBase.interface';
import * as express from 'express';
import ProductService from '../../../service/ProductService';
import { mult } from '../../../middleware/ImageMiddleware';
import ResponseManager from '../../../managers/ResponseManager';
import TokenValidator from '../../../middleware/TokenValidator';
import ValidationResult from '../../../middleware/ValidationResult';
import { Request, Response } from 'express';

class ProductController implements IControllerBase {

    private path = '/product';
    private router = express.Router();
    private productService: ProductService;

    constructor() {
        this.initRoutes();
        this.productService = new ProductService();
    }

    initRoutes(): any {
        /* Create Product */
        this.router.post(this.path + '/:productCategoryId', mult.single('productPicture'),
            ValidationResult,
            TokenValidator(),
            this.createProduct);
        /* Get Products By Their Category */
        this.router.get(this.path + '/:productCategoryId',
            ValidationResult,
            TokenValidator(),
            this.getProductsByCategory);
    }

    private createProduct = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        let product = await this.productService.createProduct(
            req.body,
            req.params.productCategoryId,
            req.file,
            responseHandler
        );
        res.status(201).json(product);
    };

    private getProductsByCategory = async (req: Request, res: Response) => {
        const responseHandler = ResponseManager.getResponseHandler(res);
        const iProducts = await this.productService.getAllProductsByTheirCategory(
            req.params.productCategoryId,
            responseHandler
        );
        res.status(200).json(iProducts);
    }

}

export default ProductController;

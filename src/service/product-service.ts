import { ProductModel } from '../model/products';

class ProductService {

    public createProduct = async (data, productCategoryId, productPicture, callback) => {
        try {
            const product = new ProductModel();
            product.productName = data.productName;
            product.productPicture = productPicture ? productPicture.path : ' ';
            product.productPrice = data.productPrice;
            product.productDescription = data.productDescription;
            product.productStars = data.productStars;
            product.productColor = data.productColor;
            product.productItemsCount = data.productItemsCount;
            product.productSize = data.productSize;
            product.productDiscount = data.productDiscount;
            product.productModelGender = data.productModelGender;
            product.productCategoryId = productCategoryId;
            let iProduct = await product.save();
            callback.onSuccess(iProduct, 'Product Successfully created', 201);
        } catch (e) {
            callback.onError(e);
        }
    };
    getAllProductsByTheirCategory = async (productCategoryId, callback) => {
        try {
            const productsWithCategory = await ProductModel.find({productCategoryId: productCategoryId});
            callback.onSuccess(productsWithCategory, `Products of Category Reprieved)`, 200);
        } catch (e) {
            callback.onError(e);
        }
    }

    getAllProducts = async (res, callback) => {
        try {
            const allProducts = await ProductModel.find({});
            callback.onSuccess(allProducts, `Product List`, 200);
        } catch (e) {
            callback.onError(e);
        }
    }

}

export default ProductService;

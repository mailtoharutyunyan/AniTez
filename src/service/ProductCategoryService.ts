import { ProductCategoryModel } from '../model/ProductCategory';

class ProductCategoryService {

    public createProductCategory = async (productCategoryName, productCategoryImage, uid, callback) => {
        try {
            const productCategory = new ProductCategoryModel();
            productCategory.categoryName = productCategoryName;
            productCategory.categoryImage = productCategoryImage ? productCategoryImage.path : ' ';
            productCategory.user_id = uid;
            let iProductCategory = await productCategory.save();
            callback.onSuccess({
                productCategoryId: iProductCategory._id,
                productCategoryName: iProductCategory.categoryName,
                productCategoryImage: iProductCategory.categoryImage,
                userId: iProductCategory.user_id,
            }, 'Category Successfully created', 201)
        } catch (e) {
            callback.onError(e);
        }
    };

    public getUserProductCategories = async (uid, callback) => {
        try {
            const productCategory = await ProductCategoryModel.find({user_id: uid});
            return callback.onSuccess(productCategory, 'Retrieved User Product Categories', 200);
        } catch (e) {
            return callback.onError(e)
        }
    };

    public getAllProductCategories = async (data, callback) => {
        try {
            const productCategory = await ProductCategoryModel.find().populate('products');
            return callback.onSuccess(productCategory, 'Retrieved Product Categories', 200);
        } catch (e) {
            return callback.onError(e)
        }
    }

}

export default ProductCategoryService;

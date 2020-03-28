import { Document, model, Schema } from 'mongoose';


export interface ProductCategory extends Document {
    categoryName: string;
    categoryImage: string;
    user_id: string;
}

export const ProductCategorySchema = new Schema({
    categoryName: {type: String},
    categoryImage: {type: String},
    user_id: {type: Schema.Types.ObjectId, required: true},
}, {
    versionKey: false, timestamps: true,
    toJSON: {
        transform(doc, ret) {
            Reflect.deleteProperty(ret, '_id');
            Reflect.deleteProperty(ret, '__v');
            Reflect.deleteProperty(ret, '__t');
            ret.productCategoryId = doc._id;
        }
    }
});
const ProductCategoryModel = model<ProductCategory>('product-category', ProductCategorySchema);

export { ProductCategoryModel };

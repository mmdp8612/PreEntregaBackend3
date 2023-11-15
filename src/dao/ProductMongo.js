import Product from "./models/Product.js";

export class ProductMongo {

    constructor(){

    }

    async getProducts(paginate=null, search=null){
        try {
            const { limit, page, order } = paginate;

            const sort = order === 'ASC' ? { price: 1 } : order === 'DESC' ? { price: -1 } : null;
            
            const query = search ? { title: { $regex: search, $options: 'i' } } : {};

            return await Product.paginate(query, {limit, page, sort});
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(title, description, price, code, stock, status, category, thumbnail=null){
        try {
            if(title==="" || description==="" || price === "" || code === "" || stock === "" || status === "" || category === ""){
                throw new Error(`All fields are required`);
            }
            
            const data = {
                title, 
                description, 
                price, 
                code, 
                stock, 
                status, 
                category,
                thumbnail
            }
            const product = new Product(data);
            await product.save();
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async getProductById(productId){
        try {
            return await Product.findById(productId);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(productId, params){
        try {
            await Product.findByIdAndUpdate(productId, params, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(productId){
        try {
            await Product.findByIdAndDelete(productId);
        } catch (error) {
            throw new Error(error);
        }
    }
}
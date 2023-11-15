import { productsService } from "../services/ProductsService.js";

const getAllProducts = async (req, res) => {
    try{
        const { limit=10, page=1, order='ASC', search } = req.query;
        const products = await productsService.getProducts({
            limit,
            page,
            order
        }, search);
        
        const { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;

        res.status(200).json({
            data: products.docs,
            paginate: {
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            }
        })
    }catch(error){
        res.status(404).json({error: error.message});   
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);
        res.status(200).json({
            data: product
        })   
    } catch (error) {
        res.status(404).json({error: error.message});   
    }
}

const postProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    try{
        await productsService.addProduct(title, description, price, code, stock, status, category, thumbnail);
        return res.status(200).json({
            message: "Product created!"
        })
    }catch(error){
        res.status(500).json({error: error.message});     
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productsService.updateProduct(id, req.body);
        return res.status(200).json({
            message: "Product updated!"
        })
    }catch(error){
        res.status(500).json({error: error.message});   
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try{
        await productsService.deleteProduct(id);
        return res.status(200).json({
            message: "Product deleted!"
        })
    }catch(error){
        res.status(404).json({error: error.message});
    }
}

export {
    getAllProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}
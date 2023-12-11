import { addQuantityToProducts, getProductById, getProductBySearch, updateProductQuantity } from "../resolvers/shopInventoryResolvers";

export const shopInventoryQueries = {
    getProductById,
    getProductBySearch,
}

export const shopInventoryMutation = {
    updateProductQuantity,
    addQuantityToProducts,
}
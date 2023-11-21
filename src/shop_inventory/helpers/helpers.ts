import { ShopProductInterface } from "../interfaces/shopProductInterface";
import { UpdateProductInterface } from "../interfaces/updateProductInterface";

export const exportIdsToArray = (products:UpdateProductInterface[]) => {
    const ids = products.map(product => product.productId);
    return ids;
  }
  
export const checkQuantity = (productsToUpdate:UpdateProductInterface[],
                              productsToUpdateFromDb:ShopProductInterface[]) => {
    
    for(let i = 0; i < productsToUpdate.length; i++){
        const productToUpdate = productsToUpdate[i];
        const productFromDb = productsToUpdateFromDb.find(item => 
            String(item.id) === productToUpdate.productId);
        
        if(productFromDb!.quantity - productToUpdate.requiredQuantity < 0){
            throw {
                productId: String(productFromDb?.id),
                cause: "not enough in stock"
            };
        }
    }
}

export const generateUpdateQuery = (productsToUpdate:UpdateProductInterface[]) => {
    let query = `UPDATE products 
    SET quantity = CASE `;
    
    for (let i = 0; i < productsToUpdate.length; i++) {
        const product = productsToUpdate[i];
        const addToQuery = `WHEN id = ${product.productId} THEN GREATEST(quantity-${product.requiredQuantity},0) `;
        query += addToQuery;
    }

    query += `END
    WHERE id IN (`

    for (let i = 0; i < productsToUpdate.length; i++) {
        const product = productsToUpdate[i];
        const addToQuery = `${product.productId},`;
        query += addToQuery;
    }
    // remove last comma
    query = query.slice(0, -1); 

    query += `);`;
    return query;
}
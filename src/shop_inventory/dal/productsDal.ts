import { client } from "../../dbAccess/postgresConnection";
import ServerError from "../../utils/serverErrorClass";
import { ShopProductInterface } from "../interfaces/shopProductInterface";

export const getProductByIdFromDb = async (id: string) => {
    try {

        await client.query('BEGIN');
        const product = await client.query(
            `SELECT \
            id, name, salePrice, quantity, description, category, discountPercentage, imageUrl, imageAlt \
            FROM products WHERE id = $1`,
            [id]
        );
        await client.query('COMMIT');
        
        if (!product) throw new ServerError(400, "product not found");
        return product.rows[0] as ShopProductInterface;
    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};


export const getProductsBySearchFromDb = async (searchText: string) => {
    try {

        await client.query('BEGIN');        
        const products = await client.query(
            `SELECT
            id, name, salePrice, quantity, description, category, discountPercentage, imageUrl, imageAlt
            FROM products
            WHERE name ILIKE '%${searchText}%'
                OR description ILIKE '%${searchText}%'
                OR category ILIKE '%${searchText}%';`
        );
        await client.query('COMMIT');
        
        if (!products) throw new ServerError(400, "product not found");
        return products.rows as ShopProductInterface[];

    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};

export const getProductsByIdFromDb = async (ids:string[]) => {
    try {

        await client.query('BEGIN');        
        const products = await client.query(
            `SELECT
            id, name, quantity
            FROM products
            WHERE id IN (${ids});`
        );
        await client.query('COMMIT');
        
        if (!products) throw new ServerError(400, "product not found");
        return products.rows as ShopProductInterface[];

    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
};
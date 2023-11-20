import { client } from "../../dbAccess/postgresConnection";
import ServerError from "../../utils/serverErrorClass";
import { shopProductInterface } from "../interfaces/shopProductInterface";

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
        return product.rows[0] as shopProductInterface;
    } catch (error) {
        await client.query('ROLLBACK');
        return Promise.reject(error);
    }
  };
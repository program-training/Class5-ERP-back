import { client } from "../../dbAccess/redisConnection";
import { sendGetAllProductsQuery } from "../dal/internalDal";
import { AdminProductInterface } from "../interfaces/adminProductINterface";

export const getProductsRedis = async () => {
  try {
    const keys = await client.keys("products:*");

    if (keys.length === 0) {
      insertAllProductsToRedis();
      return [];
    }
    const productData = await client.json.mGet(keys, "$");
    const products = productData.map((p) => (p as any[])[0]);

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in get data from redis");
  }
};

export const insertAllProductsToRedis = async () => {
  try {
    const multi = client.multi();

    const products = await sendGetAllProductsQuery();
    products.forEach((product) => {
      multi.json.SET(`products:${product.id}`, "$", product, { NX: true });
    });

    await multi.exec();
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in set data to redis");
  }
};

export const getProductByIdRedis = async (id: string) => {
  try {
    const product = client.json.GET(`products:${id}`);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in get data from redis");
  }
};

export const addProductToRedis = async (product: AdminProductInterface) => {
  try {
    await client.json.SET(`products:${product.id}`, "$", product as any);
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in set product to redis");
  }
};

export const updateProductRedis = async (product: AdminProductInterface) => {
  try {
    await client.json.SET(`products:${product.id}`, "$", product as any, {
      XX: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in update product in redis");
  }
};

export const deleteProductRedis = async (id: string) => {
  try {
    await client.json.DEL(`products:${id}`);
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in delete product from redis");
  }
};

export const getMyProductsRedis = async (email:string) => {
  try {
    const keys = await client.keys('products:*');
    const products = await client.json.mGet(keys, '$');    
    
    // Filter products in code
    const myProducts = products.map((p) => {
      if ((p as any[])[0].createdBy === email) {
        console.log(p);
        return p
      };
    });
    console.log(myProducts);
  } catch (error) {
    console.log(error);
    throw new Error("error has accord in getting my products from redis");   
  }
}
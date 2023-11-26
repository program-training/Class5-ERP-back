import { describe, test, expect } from 'vitest'
import { addQuantityToProducts, getProductById, getProductsBySearch, updateProductsById } from '../services/productsService';

describe('getProductById function', () => {

  test('return valid product', async () => {
    const productKeys = [
        'id',
        'name',
        'salePrice',
        'quantity',
        'description',
        'category',
        'discountPercentage',
        'imageUrl',
        'imageAlt'
    ];
    const id = '1';
    const result = await getProductById(id);

    expect(Object.keys(result)).toEqual(productKeys);
  });
});

describe('getProductsBySearch function', () => {

  test('return search item', async () => {
    const searchText = "shirt";
    const result = await getProductsBySearch(searchText);
    const toCheck = result[0].name + result[0].category + result[0].description;
    expect(toCheck).contain(searchText);
  });
});

describe('updateProductsById function', () => {
  test('return proper response', async () => {
    const testReq = [
      {
          productId: "10",
          requiredQuantity: 1
      }
    ];
    const result = await updateProductsById(testReq);
    expect(Object.keys(result)).toEqual(["inStock", "notInStock"]);
  });
});

describe('addQuantityToProducts function', () => {
  test('add quantity to products', async () => {
    const productId = "10";
    const prevQuantity = (await getProductById(productId)).quantity;
    const requiredQuantity = 1;

    const testReq = [
        {
          productId,
          requiredQuantity,
        }
      ];
      
    await addQuantityToProducts(testReq);
    const currentQuantity = (await getProductById(productId)).quantity;
    const result = currentQuantity - prevQuantity;

    expect(result).toEqual(requiredQuantity);
  });
});

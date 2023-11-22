import { describe, test, expect } from 'vitest'
import { getProductById } from '../services/productsService';

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
  })
})

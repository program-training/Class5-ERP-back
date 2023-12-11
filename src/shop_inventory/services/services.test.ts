import ServerError from "../../utils/serverErrorClass";
import { productMock, productKeys } from "../helpers/mocks";
import {
  addQuantityToProductsService,
  getProductByIdService,
  getProductsBySearchService,
  updateProductsById,
} from "./productsService";

const ID = "123";
const NUM_ID = 123;


describe("getProductByIdService function", () => {

    const mockGetProductByIdFromDb = jest.fn();

    beforeEach(() => {
      mockGetProductByIdFromDb.mockReset();    
    });

    it('should throw error if id is not number', async () => { 
      await expect(getProductByIdService('abc')).rejects.toThrow(ServerError);
    });

    it('should reject with error from db', async () => { 
      const errorMessage = "product not found";
      mockGetProductByIdFromDb.mockRejectedValue(new Error(errorMessage));

      await expect(getProductByIdService(123452345)).rejects.toThrow(errorMessage);
    });

    it('should resolve with product on success', async () => {
      
      mockGetProductByIdFromDb.mockResolvedValue(productMock);
      const result = await getProductByIdService(123);
      expect(result).toEqual(productMock);
    });

    it("test with number:", async () => {  
      const result = await getProductByIdService(NUM_ID);
      expect(Object.keys(result)).toEqual(productKeys);
    });
});

describe("getProductsBySearch function", () => {
  it("return search item", async () => {
    const searchText = "shirt";
    const result = await getProductsBySearchService(searchText);
    const toCheck = result[0].name + result[0].category + result[0].description;
    expect(toCheck).toContain(searchText);
  });
});

describe("updateProductsById function", () => {
  test("return proper response", async () => {
    const testReq = [
      {
        productId: ID,
        requiredQuantity: 1,
      },
    ];
    const result = await updateProductsById(testReq);
    expect(Object.keys(result)).toEqual(["inStock", "notInStock"]);
  });
});

describe("addQuantityToProductsService function", () => {
  test("add quantity to products", async () => {
    const prevQuantity = (await getProductByIdService(ID)).quantity;
    const requiredQuantity = 1;

    const testReq = [
      {
        productId:ID,
        requiredQuantity,
      },
    ];

    await addQuantityToProductsService(testReq);
    const currentQuantity = (await getProductByIdService(ID)).quantity;
    const result = currentQuantity - prevQuantity;

    expect(result).toEqual(requiredQuantity);
  });
});

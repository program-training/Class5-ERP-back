import {
  getProductByIdFromDb,
  getProductsBySearchFromDb,
} from "../dal/productsDal";

describe("getProductByIdFromDb function", () => {
  it("return valid product", async () => {
    const productKeys = [
      "id",
      "name",
      "salePrice",
      "quantity",
      "description",
      "category",
      "discountPercentage",
      "imageUrl",
      "imageAlt",
    ];
    const id = "1";
    const result = await getProductByIdFromDb(id);

    expect(Object.keys(result)).toEqual(productKeys);
  });
});

describe("getProductsBySearchFromDb function", () => {
  it("return search item", async () => {
    const searchText = "shirt";
    const result = await getProductsBySearchFromDb(searchText);
    const toCheck = result[0].name + result[0].category + result[0].description;
    expect(toCheck).toContain(searchText);
  });
});


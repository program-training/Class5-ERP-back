import { describe, expect, test } from "vitest";
import { sendGetProductByIdQuery } from "../dal/internalDal";

describe("getProductByIdQuery", () => {
  test("is returning the correct product", async () => {
    const id = "1";
    const product = [
      {
        id: 1,
        name: "Blue T-Shirt",
        saleprice: "19.99",
        quantity: 0,
        description: "Cotton short sleeve t-shirt",
        category: "Apparel",
        discountpercentage: 0,
        imageurl:
          "https://cdn.discordapp.com/attachments/1061944547246088242/1175870410601009272/meir_as[…]leeve_t-shirt_blue_71fa9687-e15c-4961-ba15-eac5122b3c51.png",
        imagealt: "Blue t-shirt",
        isforsale: true,
        costprice: "15.00",
        supplier: "T-Shirts Inc.",
      },
    ];
    expect(await sendGetProductByIdQuery(id)).toStrictEqual(product);
  });
});

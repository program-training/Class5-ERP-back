import { getAllUsersFromMongoDB } from "./mongose";
import { UserInterface } from "../interface/user";

describe(" -  fetch users from dataBase", () => {
  test("test to get all users", async () => {
    const result = await getAllUsersFromMongoDB();
    expect(result).toEqual(UserInterface[]);
  });
//   test("test if user not exsist", async () => {
//     await expect(fetchUserData(100)).rejects.toThrowError();
//   });
});

import { getAllUsersFromMongoDB, insertUsers } from "../dal/mongose";
import { generateUserPassword } from "../helpers/bcrypt";
import { UserInterface } from "../interface/user";

type UserResult = Promise<UserInterface | null>;

export const getUsers = async () => {
  try {
    const users = await getAllUsersFromMongoDB();
    return users;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface): UserResult => {
  try {
    const users = await getUsers();

    const userRegistered = users.find(
      (userInDB) => userInDB.username === user.username
    );
    if (userRegistered) throw new Error("This user is allready registered!");

    user.password = generateUserPassword(user.password);
    await insertUsers(user);
    // users.push({ ...user });

    await modifyCollection(
      "users",
      users as unknown as Record<string, unknown>[]
    );
    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

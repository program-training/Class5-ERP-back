import {
  registerUser,
  getUser,
  getUsers,
  loginUser,
} from "../resolvers/usersResolvers";

export const usersQueries = {
  getUsers,
  getUser,
};

export const usersMutation = {
  registerUser,
  loginUser,
};

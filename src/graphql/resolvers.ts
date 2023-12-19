import { usersMutation, usersQueries } from "../auth/queries/usersQueries";
import {
  inventoryMutation,
  inventoryQueries,
} from "../internalRequests/queries/inventoryQueries";
import { statisticQueries, statisticSubscriptions } from "../internalRequests/queries/statisticQueries";
import { shopInventoryMutation, shopInventoryQueries } from "../shop_inventory/queries/shopInventoryQuery";

const resolvers = {
  Query: {
    ...usersQueries,
    ...inventoryQueries,
    ...statisticQueries,
    ...shopInventoryQueries,
  },

  Mutation: {
    ...usersMutation,
    ...inventoryMutation,
    ...shopInventoryMutation,
  },

  Subscription: {
    ...statisticSubscriptions,
  }
};

export default resolvers;

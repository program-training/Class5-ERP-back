import {
  usersTypesMutation,
  usersTypes,
  usersTypesQueries,
} from "../auth/typeDef/usersTypes";
import { statisticQueries } from "../internalRequests/queries/statisticQueries";
import {
  inventoryTypes,
  inventoryTypesMutation,
  inventoryTypesQuery,
} from "../internalRequests/typeDef/inventoryTypes";
import { statisticTypesQuery, statisticsTypes } from "../internalRequests/typeDef/statisticsTypes";
import { shopInventoryTypes, shopInventoryTypesMutation, shopInventoryTypesQueries } from "../shop_inventory/typeDef/shopInventoryTypes";

const typeDefs = `#graphql   

  ${usersTypes}
  ${inventoryTypes}
  ${statisticsTypes}
  ${shopInventoryTypes}

  type Query{
    ${usersTypesQueries}
    ${inventoryTypesQuery}
    ${statisticTypesQuery}
    ${shopInventoryTypesQueries}
  }

  type Mutation {
    ${usersTypesMutation}
    ${inventoryTypesMutation}
    ${shopInventoryTypesMutation}
  }
`;

export default typeDefs;

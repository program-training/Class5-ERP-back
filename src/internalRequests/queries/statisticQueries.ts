import { getProductStatistics, statisticChanged } from "../resolvers/statisticsResolvers";

export const statisticQueries = {
    getProductStatistics,
}

export const statisticSubscriptions = {
    statisticChanged,
}
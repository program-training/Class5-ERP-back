export const shopInventoryTypes = `
    type ShopProduct {
    id: ID!
    name: String!
    salePrice: Float!
    quantity : Int!
    description : String!
    category: String!
    discountPercentage : Int!
    imageUrl:String!
    imageAlt: String!
    }

    input UpdateProduct {
        productId : String!
        requiredQuantity : Int!
    }

    type InStockProduct {
        productId: Int!
        requiredQuantity: Int!  
    }
      
    type OutOfStockProduct {
        product: ShopProduct
        requiredQuantity: Int!
    }
    
    type Response {
        inStock: [InStockProduct!]!
        notInStock: [OutOfStockProduct!]! 
    }
`;

export const shopInventoryTypesQueries = `
    getProductById(productId:ID!): ShopProduct!
    getProductBySearch(searchText:String!): [ShopProduct]!
`

export const shopInventoryTypesMutation = `
    updateProductQuantity(input:[UpdateProduct]): Response!
    addQuantityToProducts(input:[UpdateProduct]): String!
`
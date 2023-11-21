import { shopProductInterface } from "../../shop_inventory/interfaces/shopProductInterface";

export interface AdminProductInterface extends shopProductInterface {
  isForSale: boolean;
  costPrice: number;
  supplier: string;
}

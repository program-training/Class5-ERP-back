import { AdminProductInterface } from "../interfaces/adminProductINterface";

export const getArrOfObjEntries = (obj: Partial<AdminProductInterface>) => {
  const keys = Object.keys(obj);
  let values = Object.values(obj);
  values = values.map((item) => (item = `'${item}'`));
  return { keys, values };
};

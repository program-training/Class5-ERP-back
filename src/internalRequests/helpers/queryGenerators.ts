import { productEntriesType } from "../types/productEntriesType";

export const insertQGenerator = ({ keys, values }: productEntriesType) => {
  let stringKeys = "(" + keys.toString() + ")";
  let stringValues = "(" + values.toString() + ")";
  const query = `INSERT INTO products ${stringKeys} VALUES ${stringValues} RETURNING *`;
  return query;
};

export const updateQGenerator = (
  id: string,
  { keys, values }: productEntriesType
) => {
  const update = keys.map((key, i) => `${key}=${values[i]}`);
  const query = `UPDATE products SET ${update} WHERE id = ${id} RETURNING *`;
  return query;
};

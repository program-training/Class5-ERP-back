export const checkExistTableQuery = "SELECT to_regclass('products');"

export const checkExistDataQuery = "SELECT * FROM products \
                                    LIMIT 1;";

export const addTableQuery = `CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "salePrice" NUMERIC(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" VARCHAR(255) NOT NULL,
    "imageAlt" VARCHAR(255) NOT NULL,
    "isForSale" BOOLEAN NOT NULL,
    "costPrice" NUMERIC(10,2) NOT NULL,
    supplier VARCHAR(255) NOT NULL,

    CHECK (quantity >= 0)
);`

export const addDataToTableQuery = `INSERT INTO products (name, "salePrice", quantity, description, category, "discountPercentage", "imageUrl", "imageAlt", "isForSale", "costPrice", supplier)
VALUES
  ('Blue T-Shirt', 19.99, 50, 'Cotton short sleeve t-shirt', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175870410601009272/meir_asulin_Cotton_short_sleeve_t-shirt_blue_71fa9687-e15c-4961-ba15-eac5122b3c51.png', 'Blue t-shirt', true, 15.00, 'T-Shirts Inc.'),
  ('Yoga Mat', 29.99, 30, '6mm thick yoga and exercise mat', 'Fitness', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175870681997660352/meir_asulin_6mm_thick_yoga_and_exercise_mat._yoga_mat_d9619d02-199c-448d-8b54-255f760e5a3e.png', 'Yoga mat', true, 20.00, 'Active Lifestyle Co.'),
  ('Wireless Headphones', 99.99, 12, 'Bluetooth over-ear headphones', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175872330061316229/meir_asulin_Wireless_Headphones._Bluetooth_over-ear_headphones._400d5722-da66-4549-8017-9de6650b5a2f.png', 'Wireless headphones', true, 70.00, 'Audio Shop'),
  ('Coffee Maker', 79.99, 8, 'Programmable coffee maker with 12 cup capacity', 'Home', 20, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175872947689369650/meir_asulin_Programmable_coffee_machine_and_coffee_cup_b3a96e0d-dafe-4906-969a-80406be67d00.png', 'Coffee maker', true, 60.00, 'Home Goods'),
  ('Digital Camera', 399.99, 5, 'DSLR camera with 18-55mm lens', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873302359703655/meir_asulin_digital_camera__._DSLR_camera_with_18-55mm_lens_6e80d73b-6bd0-4a7c-b614-51c286a50c1d.png', 'Digital camera', true, 320.00, 'Cameras & Co.'),
  ('Leather Belt', 49.99, 23, 'Genuine leather belt', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873274731839699/meir_asulin_Genuine_leather_belt_fc788609-20f9-47d0-8a00-131f8793a8c4.png', 'Leather belt', true, 30.00, 'Belts & More'),
  ('Phone Case', 19.99, 40, 'Protective case for iPhone 12', 'Electronics', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873553091022889/meir_asulin_phone_case__._Protective_case_for_iPhone_12_10d77e32-9445-4e40-bee0-5233d2eff0bc.png', 'Phone case', true, 10.00, 'Mobile Accessories'),
  ('Smart Watch', 249.99, 15, 'Fitness tracker with heart rate monitor', 'Electronics', 10, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175873865373728908/meir_asulin_smart_watch__._Fitness_tracker_with_heart_rate_moni_59b2c259-c8bb-4f24-ab12-b199531b3efc.png', 'Smart watch', true, 200.00, 'Wearable Devices'),
  ('Backpack', 69.99, 12, 'Water-resistant backpack for school or travel', 'Apparel', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175874137189793852/meir_asulin_Backpack__._Water-resistant_backpack_for_school_or__4dd2fba8-15d4-414e-964c-dc7c9ec85d9e.png', 'Backpack', true, 50.00, 'Bags & Luggage'),
  ('Office Chair', 199.99, 3, 'Ergonomic desk chair with lumbar support', 'Home', 0, 'https://cdn.discordapp.com/attachments/1061944547246088242/1175874274834251877/meir_asulin_office_chair__Ergonomic_desk_chair_with_lumbar_supp_fa4e7522-179a-4ada-9440-d8c521fb85f2.png', 'Office chair', true, 150.00, 'Furniture Shop');`
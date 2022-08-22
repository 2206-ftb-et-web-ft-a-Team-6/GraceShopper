const client = require("./client");

// database functions 
async function createProduct({ name, description, price, price_type, category, inventory, img_url }) {
    // return the new product
    try {
      const {
        rows: [product],
      } = await client.query(
        `INSERT INTO products(name, description, price, price_type, category, inventory, img_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
        ON CONFLICT (name) DO NOTHING 
         RETURNING *`,
        [name, description, price, price_type, category, inventory, img_url]
      );
  
      return product;
    } catch (error) {
      console.error("Failed to create product!");
      throw error;
    }
  }

  async function getAllProducts() {
     // select and return an array of all products
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM products;
    `
    );

    return rows;
  } catch (error) {
    console.error("Failed to get products!");
    throw error;
  }
  }

  async function getProductById(id) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE id=$1;
      `,
        [id]
      );
  
      return product;
    } catch (error) {
      console.error("Failed to get product!");
      throw error;
    }
  }
  async function getProductByName(name) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE name=$1;
      `,
        [name]
      );
  
      return product;
    } catch (error) {
      console.error("Failed to get product!");
      throw error;
    }
  }
  async function getProductByCategory(category) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `
        SELECT *
        FROM products
        WHERE category=$1;
      `,
        [category]
      );
  
      return product;
    } catch (error) {
      console.error("Failed to get product!");
      throw error;
    }
  }
  

  async function updateProduct({ id, ...fields }) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
  
    try {
      if (setString.length > 0) {
        const  { rows }  = await client.query(
          `
          UPDATE products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
          Object.values(fields)
        );
        return rows[0];
      }
    } catch (error) {
      console.error("Failed to update product!");
      throw error;
    }
  }

  async function deleteProduct(id) {
    const actualNum = Number.parseInt(id);
    try{
    const { rows } = await client.query(
      `
      UPDATE products
      SET "isActive" = false
      WHERE id=$1
      RETURNING *;
    `,[actualNum])
    return rows[0];
  }catch(error){
    console.error("Delete errors")
    throw error;
  }
}
  

  module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductByCategory,
    updateProduct,
    deleteProduct,
  }
  
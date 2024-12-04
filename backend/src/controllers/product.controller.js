import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
  try {
    
    const { 
      page = 1, 
      limit = 10, 
      category,
      team,
      minPrice,
      maxPrice,
      sort = 'createdAt'
    } = req.query;

    //query object
    const query = {};

   
    if (category) {
      query.category = category;
    }

    
    if (team) {
      query.team = team;
    }

    // Add price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

   
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

   
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch products with pagination and optional filtering
    const products = await Product.find(query)
      .sort({ [sort]: -1 }) // Sort in descending order
      .skip(skip)
      .limit(limitNumber);

   
    const totalProducts = await Product.countDocuments(query);

    // Send response
    res.status(200).json({
      success: true,
      totalProducts,
      resultCount: products.length,
      page: pageNumber,
      totalPages: Math.ceil(totalProducts / limitNumber),
      products
    });

  } catch (error) {
    // Error handling
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};
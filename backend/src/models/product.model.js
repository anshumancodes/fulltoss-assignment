import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Jerseys', 
      'Accessories', 
      'Training Wear', 
      'Casual Wear', 
      'Collectibles'
    ]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  sizes: [{
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL', 'One Size']
  }],
  color: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: '/images/default-product.jpg'
  },
  team: {
    type: String,
    enum: [
      'Mumbai Indians',
      'Chennai Super Kings',
      'Royal Challengers Bangalore',
      'Delhi Capitals'

    ]
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
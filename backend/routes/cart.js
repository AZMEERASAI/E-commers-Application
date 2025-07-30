// routes/cart.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add item to cart
router.post('/', async (req, res) => {
  const { itemId } = req.body;
  const user = await User.findById(req.user.id);
  const existing = user.cart.find(i => i.item.toString() === itemId);
  if (existing) {
    existing.quantity++;
  } else {
    user.cart.push({ item: itemId });
  }
  await user.save();
  res.json(user.cart);
});

// Get cart
router.get('/', async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.item');
  res.json(user.cart);
});

// Remove one quantity or remove item completely
router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.user.id);
  const index = user.cart.findIndex(i => i._id.toString() === req.params.id);

  if (index !== -1) {
    if (user.cart[index].quantity > 1) {
      user.cart[index].quantity -= 1;
    } else {
      user.cart.splice(index, 1);
    }
    await user.save();
    const populated = await User.findById(req.user.id).populate('cart.item');
    return res.json(populated.cart);
  }

  res.status(404).json({ error: 'Item not found in cart' });
});

module.exports = router;

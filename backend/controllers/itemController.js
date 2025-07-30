// const Item = require('../models/Item');

// exports.createItem = async (req, res) => {
//   const { name, description, price } = req.body;
//   const image = req.file.filename;
//   const item = new Item({ name, description, price, image, createdBy: req.user.id });
//   await item.save();
//   res.send(item);
// };

// exports.getItems = async (req, res) => {
//   const items = await Item.find();
//   res.send(items);
// };

// exports.deleteItem = async (req, res) => {
//   await Item.findByIdAndDelete(req.params.id);
//   res.send({ message: "Item deleted" });
// };



// controllers/itemController.js
const Item = require('../models/Item');
const path = require('path');

exports.createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const item = new Item({
      name,
      description,
      price,
      image,
      createdBy: req.user.id
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Item creation failed' });
  }
};

// exports.getItems = async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch items' });
//   }
// };

// GET /items — returns all items for users, own items for admins
exports.getItems = async (req, res) => {
  try {
    let items;
     console.log("req.user:", req.user);
    if (req.user.role === 'admin') {
      items = await Item.find({ createdBy: req.user.id });
    } else {
      items = await Item.find();
    }

    res.json(items);
  } catch (err) {
    console.error('Fetch Items Error:', err); // 🔍 Log full error
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};


// exports.deleteItem = async (req, res) => {
//   console.log("correct");
//   try {
//     const item = await Item.findById(req.params.id);
//       const authHeader = req.headers.authorization;
//       console.log('Auth Header:', authHeader);
//     if (!item) return res.status(404).json({ error: 'Item not found' });
//     if (item.createdBy.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
//     await item.remove();
//     res.json({ message: 'Item deleted' });
//   } catch (err) {
//     res.status(500).json({ error: 'Item deletion failed' });
//   }
// };
// controllers/itemController.js
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Item.findByIdAndDelete(req.params.id); // ✅ FIXED LINE
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error('Delete Error:', err);
    res.status(500).json({ error: 'Item deletion failed' });
  }
};


exports.updateItem = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };
    if (req.file) {
      updateData.image = '/uploads/' + req.file.filename;
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

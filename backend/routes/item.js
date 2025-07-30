// const express = require('express');
// const { createItem, getItems, deleteItem } = require('../controllers/itemController');
// const auth = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/upload');
// const router = express.Router();

// router.post('/', auth, upload.single('image'), createItem);
// router.get('/', getItems);
// router.delete('/:id', auth, deleteItem);

// module.exports = router;





// routes/item.js
const express = require('express');
const { createItem, getItems, deleteItem ,updateItem} = require('../controllers/itemController');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const router = express.Router();

router.get('/',auth, getItems);
router.post('/', auth, upload.single('image'), createItem);
router.delete('/:id', auth, deleteItem);
router.put('/:id', auth, upload.single('image'), updateItem);


module.exports = router;
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // ✅ Import DB connection

// dotenv.config();
// connectDB(); // ✅ Call it

// const authRoutes = require('./routes/auth');
// const itemRoutes = require('./routes/item');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// app.use('/api/auth', authRoutes);
// app.use('/api/items', itemRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/item');
const cartRoutes = require('./routes/cart');
const path = require('path');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // authentication is handled in routes
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(5000, () => console.log('Server running on port 5000'));

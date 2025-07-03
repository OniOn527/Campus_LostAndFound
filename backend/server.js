const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const messageRoutes = require('./routes/messageRoutes');



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/messages', messageRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', require('./routes/uploadRoutes'));


sequelize.sync({ alter: true }).then(() => {
  console.log('✅ 数据库已同步');
  app.listen(process.env.PORT || 5000, () => {
    console.log('🚀 服务器已启动');
  });
});

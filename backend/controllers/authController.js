const { User } = require('../models');
const jwt = require('jsonwebtoken');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    const token = createToken(user.id);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }
    const token = createToken(user.id);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

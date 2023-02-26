const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const mongoose = require('mongoose');
const { Token } = require('./models/blackList');

mongoose.set('strictQuery', false);
const { HOST_URI } = process.env;

(async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful!');

    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (error) {
    console.error('Error while connecting to database', error.message);
    process.exit(1);
  }
})();

setInterval(async () => {
  const date = Date.now();
  await Token.deleteMany({ deletedAt: { $lte: date } });
  console.log('Очистка токенів пройшла успішно');
}, 7 * 24 * 60 * 60 * 1000);

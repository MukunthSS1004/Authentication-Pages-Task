import 'dotenv/config';
import app from './app.js';
import { connectDB } from './connections/db.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server running → http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();

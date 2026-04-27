import express from 'express';
import cors from 'cors';
import appleRouter from './routes/apple';
import googleRouter from './routes/google';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/apple', appleRouter);
app.use('/api/google', googleRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

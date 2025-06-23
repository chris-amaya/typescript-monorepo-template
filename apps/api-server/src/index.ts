import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '@{{projectName}}/shared';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Add your routes here

app.listen(PORT, () => {
  logger.info(`API Server running on port ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import questionRoutes from './routes/questions';
import studentRoutes from './routes/students';

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/questions', questionRoutes);
app.use('/api/students', studentRoutes);

let server: any;

export const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  return server;
};

export const closeServer = () => {
  if (server) {
    server.close();
  }
};

if (require.main === module) {
  startServer();
}

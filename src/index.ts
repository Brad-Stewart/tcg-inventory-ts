import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { Database } from './database/database';
import { AuthService } from './services/auth';
import { createAuthRoutes } from './routes/auth';
import { createCardRoutes } from './routes/cards';
import { createApiRoutes } from './routes/api';

// Initialize app
const app = express();
const port = parseInt(process.env.PORT || '5001');

// Initialize database
const db = new Database();

// Configure Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());

// Routes
app.use('/', createAuthRoutes(db));
app.use('/', createCardRoutes(db));
app.use('/api', createApiRoutes(db));

// Error handling
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(500).render('error', { error: 'Internal Server Error' });
});

// 404 handling
app.use((req, res) => {
  res.status(404).render('error', { error: 'Page Not Found' });
});

// Initialize default admin user
AuthService.createDefaultAdmin(db).then(() => {
  // Start server
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 TCG Inventory Server running at http://localhost:${port}`);
    console.log(`📊 Default admin: admin@packrat.local / packrat123`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  db.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  db.close();
  process.exit(0);
});

// Export app for serverless deployment
export default app;
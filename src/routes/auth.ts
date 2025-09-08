import { Router, Request, Response } from 'express';
import { Database } from '../database/database';
import { AuthService } from '../services/auth';
import { JWTAuthService } from '../services/jwtAuth';

export function createAuthRoutes(db: Database): Router {
  const router = Router();

  // Login page
  router.get('/login', (req: Request, res: Response) => {
    res.render('login');
  });

  // Login POST
  router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.render('login', { error: 'Email and password are required' });
        return;
      }

      const user = await AuthService.authenticateUser(db, email, password);

      if (user && user.id) {
        // Set JWT token as cookie
        JWTAuthService.setAuthCookie(res, {
          userId: user.id,
          email: user.email
        });
        res.redirect('/');
        return;
      } else {
        res.render('login', { error: 'Invalid email or password' });
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
      res.render('login', { error: 'An error occurred during login' });
    }
  });

  // Register page
  router.get('/register', (req: Request, res: Response) => {
    res.render('register');
  });

  // Register POST
  router.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password, confirm_password } = req.body;

      if (!email || !password || !confirm_password) {
        res.render('register', { error: 'All fields are required' });
        return;
      }

      if (password !== confirm_password) {
        res.render('register', { error: 'Passwords do not match' });
        return;
      }

      await AuthService.registerUser(db, email, password);
      res.render('login', { success: 'Registration successful! Please log in.' });

    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message === 'Email already exists') {
        res.render('register', { error: 'Email already exists' });
      } else {
        res.render('register', { error: 'An error occurred during registration' });
      }
    }
  });

  // Logout
  router.get('/logout', (req: Request, res: Response) => {
    JWTAuthService.clearAuthCookie(res);
    res.redirect('/login');
  });

  return router;
}
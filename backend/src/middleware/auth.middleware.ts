import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload, AuthenticatedRequest } from '../types/auth.types';

/**
 * Middleware para autenticar solicitudes mediante tokens JWT.
 * 
 * **Consideraciones de seguridad:**
 *  - **Secreto JWT:** El secreto JWT se almacena en una variable de entorno para evitar que se exponga en el código fuente.
 *  - **Verificación exhaustiva:** Se verifica la presencia del token y su validez para evitar accesos no autorizados.
 *  - **Manejo de errores:** Se manejan los errores de forma adecuada para evitar revelar información sensible.
 * 
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función para pasar al siguiente middleware.
 */

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Authentication token required' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware para validar los datos de registro de un usuario.
 * 
 * **Consideraciones de seguridad:**
 *  - **Validación de entrada:** Se valida el formato del correo electrónico y la longitud de la contraseña para prevenir ataques de inyección.
 *  - **Prevención de ataques de fuerza bruta:** Implementar medidas adicionales como limitar el número de intentos de inicio de sesión fallidos.
 * 
 * @param req La solicitud HTTP.
 * @param res La respuesta HTTP.
 * @param next La función para pasar al siguiente middleware.
 */

export const validateRegisterInput = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      res.status(400).json({
        message: 'Email, password and name are required'
      });
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        message: 'Invalid email format'
      });
      return;
    }
  
    // Validate password strength
    if (password.length < 6) {
      res.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
      return;
    }
  
    next();
  };
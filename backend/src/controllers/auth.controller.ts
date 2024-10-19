 /**
 * @file auth.controller.ts
 * @author [Santiago] 
 * @description Este archivo define el controlador de autenticación `AuthController` para manejar las solicitudes de registro e inicio de sesión de usuarios.
 *
 * Este controlador utiliza el servicio `AuthService` para realizar las operaciones de autenticación y proporciona métodos para registrar nuevos usuarios, iniciar sesión y registrar perfiles de usuario.
 */
 
 import { NextFunction, Request, Response } from 'express';
 import { AuthService } from '../services/auth.service';

/**
 * Clase AuthController
 * @description Esta clase proporciona métodos para manejar las solicitudes de autenticación.
 */

export class AuthController {

     /**
   * Registra un nuevo usuario
   * @param req La solicitud HTTP que contiene los datos del usuario a registrar (email, password, name).
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   * @throws Error Si ocurre un error durante el registro.
   */

    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          console.log('Datos recibidos:', req.body); // Log de datos recibidos
          const { email, password, name } = req.body;
          const result = await AuthService.register({ email, password, name });
          console.log('Usuario registrado:', result); // Log del resultado
          res.status(201).json(result);
        } catch (error) {
          console.error('Error en registro:', error); // Log de error
          if (error instanceof Error) {
            if (error.message === 'Email already registered') {
              res.status(409).json({ message: error.message });
              return;
            }
          }
          next(error);
        }
    }

     /**
   * Inicia sesión a un usuario
   * @param req La solicitud HTTP que contiene las credenciales del usuario (email, password).
   * @param res La respuesta HTTP que se enviará al cliente.
   * @throws Error Si ocurre un error durante el inicio de sesión.
   */

    static async login(req: Request, res: Response): Promise<void> {
        try {
          console.log('Intento de login:', req.body); // Log de datos recibidos
          const { email, password } = req.body;
          const result = await AuthService.login({ email, password });
          console.log('Login exitoso:', { email: result.user.email }); // Log del resultado
          res.status(200).json(result);
        } catch (error) {
          console.error('Error en login:', error); // Log de error
          if (error instanceof Error) {
            if (error.message === 'Invalid credentials') {
              res.status(401).json({ message: error.message });
              return;
            }
          }
          res.status(500).json({ message: 'Error during login' });
        }
    }

    /**
   * Registra el perfil de un usuario
   * @param req La solicitud HTTP que contiene los datos del perfil del usuario (address, photoUrl, email, password, name).
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   * @throws Error Si ocurre un error durante el registro del perfil.
   */
  
    static async registerProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address, photoUrl, email, password, name } = req.body;

      const result = await AuthService.registerProfile({ address, photoUrl, email, password, name });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
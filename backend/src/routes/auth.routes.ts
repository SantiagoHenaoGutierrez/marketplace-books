import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateRegisterInput } from '../middleware/auth.middleware';

const router = Router();

/**
 * Ruta POST /register
 *
 * Esta ruta maneja las solicitudes de registro de nuevos usuarios.
 *
 * 1. **Valida los datos de entrada:** Utiliza el middleware `validateRegisterInput` para asegurar que los datos proporcionados por el usuario sean válidos y seguros.
 * 2. **Crea un nuevo usuario:** Llama al método `register` del controlador `AuthController` para crear un nuevo usuario en la base de datos.
 *
 * @param req La solicitud HTTP que contiene los datos del nuevo usuario.
 * @param res La respuesta HTTP que se enviará al cliente.   
 */

router.post('/register', validateRegisterInput, AuthController.register);

/**
 * Ruta POST /registerProfile
 *
 * Esta ruta generalmente se utiliza para completar el perfil del usuario después del registro inicial.
 * 
 * **Nota:** La funcionalidad exacta de esta ruta puede variar según la aplicación. Podría utilizarse para:
 *   - Agregar información adicional al perfil del usuario (como dirección, fecha de nacimiento, etc.).
 *   - Asociar cuentas de redes sociales.
 *   - Configurar preferencias del usuario.
 *
 * 1. **Valida los datos de entrada:** Utiliza el middleware `validateRegisterInput` para validar los datos del perfil.
 * 2. **Completa el perfil:** Llama al método `registerProfile` del controlador `AuthController` para actualizar el perfil del usuario.
 *
 * @param req La solicitud HTTP que contiene los datos del perfil del usuario.
 * @param res La respuesta HTTP que se enviará al cliente.
 */

router.post('/registerProfile', validateRegisterInput, AuthController.registerProfile);

/**
 * Ruta POST /login
 *
 * Esta ruta maneja las solicitudes de inicio de sesión.
 *
 * 1. **Autenticación:** Llama al método `login` del controlador `AuthController` para verificar las credenciales del usuario y generar un token de autenticación si son válidas.
 *
 * @param req La solicitud HTTP que contiene las credenciales de inicio de sesión del usuario.
 * @param res La respuesta HTTP que se enviará al cliente.
 */

router.post('/login', AuthController.login);

export default router;
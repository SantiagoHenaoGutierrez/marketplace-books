
// backend/src/services/auth.service.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export class AuthService {

     /**
     * Registra un nuevo usuario.
     *
     * **Medidas de seguridad:**
     *  - **Hashing de contraseñas:** Utiliza bcrypt para hashear la contraseña antes de almacenarla en la base de datos.
     *  - **Validación de correo electrónico:** Verifica si el correo electrónico ya existe para evitar duplicados.
     *  - **JWT seguro:** Genera un JWT con un secreto almacenado en una variable de entorno y un tiempo de expiración definido.
     *
     * @param {object} userData - Objeto con los datos del usuario (email, password, name).
     * @returns {Promise<object>} Una promesa que resuelve con un objeto que contiene el token y los datos del usuario.
     */

  static async register({ email, password, name }: { email: string; password: string; name: string }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  /**
     * Inicia sesión a un usuario.
     *
     * **Medidas de seguridad:**
     *  - **Comparación de contraseñas:** Utiliza bcrypt para comparar la contraseña proporcionada con la almacenada.
     *  - **JWT seguro:** Genera un JWT con un secreto almacenado en una variable de entorno y un tiempo de expiración definido.
     *
     * @param {object} credentials - Objeto con las credenciales del usuario (email, password).
     * @returns {Promise<object>} Una promesa que resuelve con un objeto que contiene el token y los datos del usuario.
     */

  static async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  private static readonly prisma = new PrismaClient();

  static async registerProfile({ address, photoUrl, email, password, name }: { address: string; photoUrl: string; email: string; password: string; name: string }) {
    if (!address) {
      throw new Error('La dirección es requerida');
    }
  
    const user = await this.prisma.user.create({
      data: {
        address,
        photoUrl,
        email,
        password,
        name,
      },
    });
  
    return user;
  }
}
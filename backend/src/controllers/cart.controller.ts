// src/controllers/cart.controller.ts

/**
 * @file cart.controller.ts
 * @author [Santiago] 
 * @description Este archivo define el controlador `CartController` para manejar las operaciones relacionadas con el carrito de compras del usuario.
 * 
 * Utiliza el cliente Prisma para interactuar con la base de datos y requiere autenticación para acceder a los endpoints.
 */

import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../types/auth.types';

const prisma = new PrismaClient();

export class CartController {

    /**
   * Obtiene el carrito del usuario actualmente autenticado.
   * 
   * @param req La solicitud HTTP que contiene la información del usuario autenticado (`req.user`).
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   */

  static async getCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      let cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId: userId!,
            items: {
              create: []
            }
          },
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        });
      }

      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Agrega un producto al carrito del usuario autenticado.
   * 
   * @param req La solicitud HTTP que contiene el ID del producto y la cantidad a agregar (`req.body`).
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   */

  static async addToCart(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { productId, quantity } = req.body;

      // Verificar stock disponible
      const product = await prisma.product.findUnique({
        where: { id: productId }
      });

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if (product.stock < quantity) {
        res.status(400).json({ message: 'Insufficient stock' });
        return;
      }

      // Buscar o crear el carrito del usuario
      let cart = await prisma.cart.findUnique({
        where: { userId }
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId: userId!
          }
        });
      }

      // Agregar item al carrito
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      });

      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Realiza el checkout del carrito del usuario autenticado.
   * 
   * @param req La solicitud HTTP que contiene la información del usuario autenticado (`req.user`).
   */
  
  static async checkout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;

      // Obtener el carrito con sus items
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      if (!cart || cart.items.length === 0) {
        res.status(400).json({ message: 'Cart is empty' });
        return;
      }

      // Verificar y actualizar stock de cada producto
      for (const item of cart.items) {
        if (item.product.stock < item.quantity) {
          res.status(400).json({ 
            message: `Insufficient stock for product: ${item.product.title}` 
          });
          return;
        }

        await prisma.product.update({
          where: { id: item.product.id },
          data: {
            stock: item.product.stock - item.quantity
          }
        });
      }

      // Limpiar el carrito
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      res.status(200).json({ message: 'Checkout completed successfully' });
    } catch (error) {
      next(error);
    }
  }
}
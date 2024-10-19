// src/controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../types/auth.types';

const prisma = new PrismaClient();

export class ProductController {

   /**
   * Obtiene todos los productos, incluyendo información del vendedor asociado.
   * 
   * @param req La solicitud HTTP.
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   */

  static async getProducts(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await prisma.product.findMany({
        include: {
          seller: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea un nuevo producto.
   * 
   * @param req La solicitud HTTP que contiene la información del nuevo producto.
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   */

  static async createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { isbn, title, price, author, editorial, stock } = req.body;
      const sellerId = req.user?.id;

      const product = await prisma.product.create({
        data: {
          isbn,
          title,
          price: parseFloat(price),
          author,
          editorial,
          stock: parseInt(stock),
          imageUrl: req.body.imageUrl || null,
          sellerId: sellerId!
        }
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza el stock de un producto existente.
   * 
   * @param req La solicitud HTTP que contiene el ID del producto y la nueva cantidad de stock.
   * @param res La respuesta HTTP que se enviará al cliente.
   * @param next La función para pasar el control al siguiente middleware en caso de error.
   */
  
  static async updateStock(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
      });

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if (product.stock < quantity) {
        res.status(400).json({ message: 'Insufficient stock' });
        return;
      }

      await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          stock: product.stock - quantity
        }
      });

      res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
      next(error);
    }
  }
}
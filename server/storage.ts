import { users, products, orders, orderItems, type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";
import { Store } from "express-session";
import { eq, and } from "drizzle-orm";
import { db } from "./db";
import connectPg from "connect-pg-simple";
import { pool } from './db';

// Interface de armazenamento que descreve as operações disponíveis
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsers(): Promise<User[]>;

  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrders(): Promise<Order[]>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // OrderItem operations
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Session store
  sessionStore: Store;
}

// Implementação de armazenamento no banco de dados PostgreSQL
export class DatabaseStorage implements IStorage {
  sessionStore: Store;

  constructor() {
    // Configurar o store de sessão para usar PostgreSQL
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Product operations
  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: number, updateProduct: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products)
      .set(updateProduct)
      .where(eq(products.id, id))
      .returning();
    
    return result[0];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(insertOrder).returning();
    return result[0];
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const result = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    
    return result[0];
  }

  // OrderItem operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const result = await db.insert(orderItems).values(insertOrderItem).returning();
    return result[0];
  }
}

// Exportar a implementação de armazenamento no banco de dados
export const storage = new DatabaseStorage();

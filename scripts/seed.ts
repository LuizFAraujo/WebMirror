import { db } from "../server/db";
import { users, products, orders, orderItems } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function main() {
  console.log("Iniciando seed do banco de dados...");

  try {
    // Criar usuário administrador
    const adminUser = {
      username: "admin",
      password: await hashPassword("admin123"),
      email: "admin@example.com",
      fullName: "Admin User",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
    };

    // Verificar se o usuário admin já existe
    const existingAdmin = await db.select().from(users).where(eq(users.username, "admin"));
    
    if (existingAdmin.length === 0) {
      // Criar o usuário administrador se não existir
      await db.insert(users).values(adminUser);
      console.log("Usuário administrador criado com sucesso!");
    } else {
      console.log("Usuário administrador já existe.");
    }

    // Criar produtos de exemplo
    const sampleProducts = [
      {
        name: "Notebook Pro X1",
        description: "Notebook de alta performance para profissionais",
        price: "1299.99",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=300",
        category: "Eletrônicos",
        inventory: 25
      },
      {
        name: "Smartphone Galaxy S23",
        description: "Smartphone com câmera de alta resolução e bateria de longa duração",
        price: "899.99",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=300",
        category: "Eletrônicos",
        inventory: 50
      },
      {
        name: "Monitor Curvo 32\"",
        description: "Monitor curvo de alta resolução para gaming e design",
        price: "349.99",
        image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=300",
        category: "Eletrônicos",
        inventory: 15
      },
      {
        name: "Teclado Mecânico RGB",
        description: "Teclado mecânico com iluminação RGB personalizável",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=300",
        category: "Acessórios",
        inventory: 30
      },
      {
        name: "Mouse Gamer 16000 DPI",
        description: "Mouse de alta precisão para jogos competitivos",
        price: "59.99",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=300",
        category: "Acessórios",
        inventory: 40
      }
    ];

    // Verificar se já existem produtos
    const existingProducts = await db.select().from(products);
    
    if (existingProducts.length === 0) {
      // Criar produtos se não existirem
      await db.insert(products).values(sampleProducts);
      console.log("Produtos de exemplo criados com sucesso!");
    } else {
      console.log("Produtos já existem no banco de dados.");
    }

    // Obter o ID do usuário administrador para criar pedidos
    const adminUserData = await db.select().from(users).where(eq(users.username, "admin"));
    
    if (adminUserData.length > 0) {
      const adminId = adminUserData[0].id;
      
      // Verificar se já existem pedidos
      const existingOrders = await db.select().from(orders);
      
      if (existingOrders.length === 0) {
        // Criar pedidos de exemplo
        const orderData = {
          userId: adminId,
          total: "459.98",
          status: "completed"
        };
        
        const [order] = await db.insert(orders).values(orderData).returning();
        console.log("Pedido de exemplo criado com sucesso!");
        
        // Obter produtos para adicionar ao pedido
        const productsList = await db.select().from(products).limit(2);
        
        if (productsList.length >= 2) {
          // Adicionar itens ao pedido
          const orderItemsData = [
            {
              orderId: order.id,
              productId: productsList[0].id,
              quantity: 1,
              price: productsList[0].price
            },
            {
              orderId: order.id,
              productId: productsList[1].id,
              quantity: 1,
              price: productsList[1].price
            }
          ];
          
          await db.insert(orderItems).values(orderItemsData);
          console.log("Itens de pedido criados com sucesso!");
        }
      } else {
        console.log("Pedidos já existem no banco de dados.");
      }
    }

    console.log("Seed concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seed:", error);
  } finally {
    process.exit(0);
  }
}

main();
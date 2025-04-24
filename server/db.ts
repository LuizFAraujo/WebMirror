import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configuração para funcionar com WebSockets (necessário para Neon Database)
neonConfig.webSocketConstructor = ws;

// Verificar se a URL do banco de dados está definida
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL deve estar definido. Você esqueceu de provisionar um banco de dados?"
  );
}

// Criar a conexão com o banco de dados
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
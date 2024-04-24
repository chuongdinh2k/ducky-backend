import { knex as createKnex, Knex as KnexType } from "knex";

let client: KnexType | null = null;
/**
 * Create an Knex instance
 * @param {Partial<KnexType.Config>} options
 * @returns {KnexType}
 */
export function getInstance(options: Partial<KnexType.Config> = {}): KnexType {
  if (client) {
    return client;
  }
  const DB_HOST: any = process.env.DB_HOST;
  const DB_USER: any = process.env.DB_USER;
  const DB_PWD: any = process.env.DB_PWD;
  const DB_NAME: any = process.env.DB_NAME;
  const DB_PORT: any = process.env.DB_PORT;
  console.log("DB_PORT", process.env.MYSQL_HOST);
  client = createKnex({
    client: "mysql2",
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PWD,
      database: DB_NAME,
      dateStrings: true,
    },
    pool: { min: 1, max: 10 },
    ...options,
  });
  return client;
}

export async function getTransaction(): Promise<
  KnexType.Transaction<any, any[]>
> {
  const knexTrx = await getInstance().transaction();
  return knexTrx;
}

export default {
  getInstance,
  getTransaction,
};

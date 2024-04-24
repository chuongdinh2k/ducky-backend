/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("admins", function (table) {
    table.increments("id").primary();
    table.string("username", 50).notNullable().unique(); // Non-nullable string for username
    table.string("password", 25).notNullable(); // Non-nullable string for email, must be unique
    table.string("name", 50).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp, defaulting to the current time
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("admins");
};

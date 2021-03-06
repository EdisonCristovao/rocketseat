require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DC_DB_HOST || process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.NAME,
  port: 5432,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

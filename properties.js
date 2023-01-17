module.exports = {
  crud_db_dbUrl: (process.env.DB_HOST || "localhost") + ":27017/crud_db",
  publicPath: "public",
  port: process.env.NODE_PORT || 3000,
  tokenSecret: "Insert Your Secret Token",
  api: process.env.NODE_API || "/api",

  // azure
  accountName: process.env.ACCOUNT_NAME || "",
  accountKey: process.env.ACCOUNT_KEY || "",
};

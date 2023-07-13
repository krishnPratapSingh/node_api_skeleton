module.exports = {
  crud_db_dbUrl: (process.env.DB_HOST || "localhost") + ":27017/flutinLive_db",
  publicPath: "public",
  port: process.env.NODE_PORT || 3000,
  tokenSecret: "Insert Your Secret Token",
  api: process.env.NODE_API || "/api",
  contextUrlProduct: "product",
  // permissions --> liveSession
  ls_create: process.env.LS_CREATE || "liveSession_create",
  ls_read: process.env.LS_READ || "liveSession_read",
  ls_update: process.env.LS_UPDATE || "liveSession_update",
  ls_delete: process.env.LS_DELETE || "liveSession_delete",
};

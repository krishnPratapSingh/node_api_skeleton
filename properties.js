module.exports = {
  // crud_db_dbUrl: (process.env.DB_HOST || "localhost") + ":27017/flutinLive_db",
  crud_db_dbUrl: `mongodb+srv://flutinProd:flutinPwd@flutin-prod.hcstm.mongodb.net/flutin_prod?authSource=admin&replicaSet=atlas-6t8gp9-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true`,
  publicPath: "public",
  port: process.env.NODE_PORT || 3000,
  tokenSecret: "Insert Your Secret Token",
  jwtSecret:
    process.env.JWT_SECRET != null
      ? process.env.JWT_SECRET
      : "jomannaayewohrakhlo",
  appId: process.env.APP_ID || "0edbf729-5391-4d7e-8dad-d6285cbcaf54",
  authHost: process.env.AUTH_HOST || "https://api.accounts.flutin.com",
  api: process.env.NODE_API || "/api",
  contextUrlProduct: "product",
  // permissions --> liveSession
  ls_create: process.env.LS_CREATE || "liveSession_create",
  ls_read: process.env.LS_READ || "liveSession_read",
  ls_update: process.env.LS_UPDATE || "liveSession_update",
  ls_delete: process.env.LS_DELETE || "liveSession_delete",
  // permissions --> user
  user_create: process.env.USER_CREATE || "user_create",
  user_read: process.env.USER_READ || "user_read",
  user_update: process.env.USER_UPDATE || "user_update",
  user_delete: process.env.USER_DELETE || "user_delete",
  // permissions --> user subscription
  userSubscription_create:
    process.env.USER_SUBSCRIPTION_CREATE || "userSubscription_create",
  userSubscription_read:
    process.env.USER_SUBSCRIPTION_READ || "userSubscription_read",
  userSubscription_update:
    process.env.USER_SUBSCRIPTION_UPDATE || "userSubscription_update",
  userSubscription_delete:
    process.env.USER_SUBSCRIPTION_DELETE || "userSubscription_delete",
  //  permissions --> user subscription
  media_create: process.env.USER_CREATE || "media_create",
  media_read: process.env.USER_READ || "media_read",
  media_update: process.env.USER_UPDATE || "media_update",
  media_delete: process.env.USER_DELETE || "media_delete",
};

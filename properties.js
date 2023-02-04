module.exports = {
  // crud_db_dbUrl: (process.env.DB_HOST || "localhost") + ":27017/crud_db",
  // azure
  crud_db_dbUrl:
    "mongodb+srv://flutinUser:flutinPwd@flutin-dev.hcstm.mongodb.net/flutin_dev?authSource=admin&replicaSet=atlas-10583w-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true",
  publicPath: "public",
  port: process.env.NODE_PORT || 3000,
  tokenSecret: "Insert Your Secret Token",
  api: process.env.NODE_API || "/api",

  // azure
  accountName: process.env.ACCOUNT_NAME || "flutinprerecordstorein01",
  accountKey:
    process.env.ACCOUNT_KEY ||
    "x8o9TQpKDHoNlsbRw/lorvnAFxPn2D2A+DP6PptKz5N4ijvlF44VQP1Xa7ZYbyaNeQe/QzfobeE5AzLkQNFMIQ==",
};

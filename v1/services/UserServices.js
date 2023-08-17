// Database
import UserModel from "../models/User/UserModel";
// Hashing
import bcrypt from "bcrypt";
//  Axios
import axios from "axios";
// properties
import properties from "../../properties";
//  jwt
import jsonwebtoken from "jsonwebtoken";

const userServices = {
  async create(item) {
    return await UserModel.create(item);
  },

  async get(id) {
    return await UserModel.get(id);
  },

  async list(item) {
    return await UserModel.list(item);
  },

  async findTestUser() {
    const testUser = await UserModel.listTestUsers(
      { testUser: true },
      { _id: 1 }
    );
    const objectIdArray = testUser.map((doc) => doc._id); //.toString()
    return objectIdArray;
  },

  async update(item) {
    return await UserModel.update(item);
  },

  async delete(id) {
    return await UserModel.delete(id);
  },

  async getByUsername(username) {
    return await UserModel.findOne({ username: username });
  },

  // ===============================================================================================================================

  async getByUsernameAndPassword(username, password) {
    console.log("username: ", username);
    console.log("password: ", password);

    let user = await UserModel.findOne({ username: username });

    if (user) {
      // const isEqual = bcrypt.compareSync(password, user.password);
      const match = await bcrypt.compare(password, user.password);
      user.password = undefined;
      if (match) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  async findUser(queryObject) {
    return await UserModel.get(queryObject);
  },

  async findUserByEmail(email) {
    const userEmail = email;
    const appid = properties.appId;
    // Create intra token
    const intraToken = jsonwebtoken.sign(
      { appId: appid },
      properties.jwtSecret,
      { expiresIn: 60 }
    );
    // Verify it on server
    const response = await axios({
      method: "post",
      url: properties.authHost + "/v1/sso/getUserId",
      data: { userEmail: userEmail },
      headers: { appid: appid, intratoken: intraToken },
    });
    if (response.data.data) {
      const userData = response.data.data.uuid;
      return userData;
    } else {
      return null;
    }
  },

  async getUserMailBySsoId(ssoId) {
    const userId = ssoId;
    const appid = properties.appId;
    // Create intra token
    const intraToken = jsonwebtoken.sign(
      {
        appId: appid,
      },
      properties.jwtSecret,
      { expiresIn: 60 }
    );
    const response = await axios({
      method: "post",
      url: properties.authHost + "/v1/sso/getUserData",
      data: { userSsoId: userId },
      headers: { appid: appid, intratoken: intraToken },
    });
    const userData = response.data.data.email;
    return userData;
  },

  async updatePassword(idUser, password) {
    let user = await UserModel.findOneAndUpdate(
      { _id: idUser },
      {
        password: password,
      }
    );
    return user;
  },
};

export default userServices;

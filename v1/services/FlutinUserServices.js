// Database
import UserModel from "../models/User/FlutinUserModel";

// Hashing
import bcrypt from "bcrypt";

const userServices = {
  async create(item) {
    return await UserModel.create(item);
  },

  async get(id) {
    return await UserModel.get(id);
  },

  async list() {
    return await UserModel.list();
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

  async getByUsernameAndPassword(username, password) {
    console.log("username: ", username);
    console.log("password: ", password);

    let user = await UserModel.findOne({ username: username });
    console.log("user in m =>>", user);
    if (user) {
      // const isEqual = bcrypt.compareSync(password, user.password);
      const match = await bcrypt.compare(password, user.password);
      // console.log("match ==>>", match);
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

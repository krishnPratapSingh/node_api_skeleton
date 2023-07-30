import UserSubscriptionModel from "../models/UserSubscription/UserSubscriptionModel";

const userSubscriptionServices = {
  async findUserSubscriptionById(item) {
    return UserSubscriptionModel.findOne(item);
  },
};

export default userSubscriptionServices;

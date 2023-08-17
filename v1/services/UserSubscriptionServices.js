import UserSubscriptionModel from "../models/UserSubscription/UserSubscriptionModel";

const userSubscriptionServices = {
  async findUserSubscriptionById(item) {
    return UserSubscriptionModel.findOneAndPopulate(item);
  },
};

export default userSubscriptionServices;

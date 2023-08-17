// Services
import UserServices from "../services/UserServices";
import EventSessionServices from "../services/EventSessionServices";
import UserSubscriptionServices from "../services/UserSubscriptionServices";

// Errors
import Errors from "../../utilities/Errors";
import ErrorManager from "../../utilities/ErrorManager";

const UserSubscriptionController = {
  findSubscription: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userSubscription =
        await UserSubscriptionServices.findUserSubscriptionById({
          _userId: userId,
          status: "active",
        });
      const responseData = { success: true, data: userSubscription };
      res.json(responseData);
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },
};

export default UserSubscriptionController;

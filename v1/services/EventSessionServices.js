import EventSessionModel from "../models/EventSession/EventSessionModel";

const EventSessionServices = {
  async eventsCount() {
    return await EventSessionModel.eventsCount();
  },
};

export default EventSessionServices;

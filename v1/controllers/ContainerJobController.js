// Services
import ContainerJobServices from "../services/ContainerJobServices";
import ContainerJobModel from "../models/ContainerJobs/ContainerModel";

// Errors
import Errors from "../classes/Errors";
import ErrorManager from "../classes/ErrorManager";

// axios
import axios from "axios";

const ContainerJobController = {
  // CRUD METHODS

  createContainersInDb: async (req, res) => {
    try {
      const result = ContainerJobServices.createContainerJobs();
      res.json({ success: true });
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(safeErr.status).json(safeErr);
    }
  },

  createJobs: async (req, res) => {
    // google api key : AIzaSyCz1rqxgSB7GcABgisVx45fVSEBBjkw-M8
    try {
      const containers = await ContainerJobModel.listWithFilter({
        jobStatus: "scheduled",
      });
      console.log("containers ==>>", containers);
      const googleAccessToken =
        "ya29.a0AX9GBdWiPdPMa7w0NfZ9IQfT4bn_WlGcZwareCykuT3fhp8tN8dvGqzOd8skZUDiukGGD8J-56-HbIrWt7gdJcBaWmUNhx4YXPVXbcATdtaZgyndmw0uYeyKdF4sbUKr3OjhuDU5OihqFWXZM6CQJZAShUe1aCgYKAc8SARASFQHUCsbCbXS_6a65ONwQ86-h7uZlCQ0163";
      const azureSAS =
        "?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2023-01-18T14:56:47Z&st=2023-01-18T06:56:47Z&spr=https&sig=zqI0T6POoPCff91s3hRmNLA2kd5WRtbIZLspNHezC0w%3D";

      for await (const container of containers) {
        console.log("container ==>>", container);
        const response = await axios({
          method: "post",
          url: "https://storagetransfer.googleapis.com/v1/transferJobs",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
          data: {
            description: container.containerName,
            status: "ENABLED",
            projectId: "flutin-test",
            schedule: {
              scheduleStartDate: {
                day: 17,
                month: 1,
                year: 2023,
              },
              startTimeOfDay: {
                hours: 8,
                minutes: 16,
              },
            },
            transferSpec: {
              azureBlobStorageDataSource: {
                storageAccount: "flutinprerecordstorein01",
                container: container.containerName,
                azureCredentials: {
                  sasToken: azureSAS,
                },
              },
              gcsDataSink: {
                bucketName: `flutin-us-01`,
                path: `azure/${container.containerName}/`,
              },
              transferOptions: {
                deleteObjectsFromSourceAfterTransfer: false,
              },
            },
          },
        });
        console.log("responsefrom google ==>>>", response);
        if (response.status == 200) {
          ContainerJobModel.updateByObj(
            { containerName: container.containerName },
            { jobStatus: "scheduled" }
          );
        }
      }
    } catch (err) {
      console.log("error in createJobs ==>>", err);
      console.log("error in createJobs error ==>>", err.response.data.error);
    }
  },
};

export default ContainerJobController;

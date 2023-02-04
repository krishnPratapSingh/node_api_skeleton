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
        jobStatus: "pending",
      });
      console.log("containers ==>>", containers);
      const googleAccessToken =
        "ya29.a0AVvZVspkhlc2MI--RUPngkfgRouqskLU0QdlS4Hi4jmrgCkCcdYqi3fBptPV3F53KZ3fUJ-JEYuoX-LN22VCJtSyiciduQE_yFHgDy-XcjGx5Yq0o8dfFA2f4-v9eg7it76AP6UVvSyygUlT7WzwFXqoFJkPEckaCgYKAe4SAQASFQGbdwaItEamlrcSa-29ZEhaAvZiCg0166";
      const azureSAS =
        "?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2023-02-23T16:10:27Z&st=2023-01-23T08:10:27Z&spr=https&sig=R3mjZY%2BLewYVNHKn%2FrQ9553Ts9MFl%2FQX7Qwwm1nQbFY%3D";
      var i = 1;
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
            projectId: "flutin-prod-01",
            schedule: {
              scheduleStartDate: {
                day: 2,
                month: 2,
                year: 2023,
              },
              startTimeOfDay: {
                hours: 1,
                minutes: 15,
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
                bucketName: `flutin_prod_in_01`,
                path: `${container.containerName}/`,
              },
              transferOptions: {
                deleteObjectsFromSourceAfterTransfer: false,
                metadataOptions: {
                  storageClass: "STORAGE_CLASS_DESTINATION_BUCKET_DEFAULT",
                },
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
          console.log(`${i} jobs scheduled of ${containers.length}`);
          i++;
        }
      }
    } catch (err) {
      console.log("error in createJobs ==>>", err);
      console.log("error in createJobs error ==>>", err.response.data.error);
    }
  },

  syncBucket: async (req, res) => {
    try {
      const result = ContainerJobServices.syncBucketJobs();
      res.json({ success: true });
    } catch (err) {
      console.log("error in syncBucket ==>>");
    }
  },

  makePublic: async (req, res) => {
    try {
    } catch (err) {}
  },
};

export default ContainerJobController;

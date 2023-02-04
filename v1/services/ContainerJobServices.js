// Database
import ContainerJobModel from "../models/ContainerJobs/ContainerModel";
// properties
import properties from "../../properties.js";
// azure blob storage sdk
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

const ContainerJobServices = {
  async createContainerJobs() {
    // azure account name and key
    const account = properties.accountName;
    const accountKey = properties.accountKey;
    // create shared key credential
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );
    // create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );
    // fetch containers
    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      if (container.name) {
        ContainerJobModel.create({
          containerName: container.name,
          jobStatus: "pending",
        });
      }
      i++;
    }
  },

  async syncBucketJobs() {
    // azure account name and key
    const account = properties.accountName;
    const accountKey = properties.accountKey;
    // create shared key credential
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      accountKey
    );
    // create blob service client
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );
    // fetch containers
    let i = 1;
    let newContainer = 1;
    for await (const container of blobServiceClient.listContainers()) {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      if (container.name) {
        const exists = await ContainerJobModel.getByObj({
          containerName: container.name,
        });
        console.log("container data ==>", exists);
        console.log(`checking ${i} ...`);
        if (exists) {
          console.log(`${container.name} container job exist`);
        } else {
          console.log(`found ${newContainer} container`);
          newContainer++;
          ContainerJobModel.create({
            containerName: container.name,
            jobStatus: "pending",
          });
        }
      }
      i++;
    }
  },
};

export default ContainerJobServices;

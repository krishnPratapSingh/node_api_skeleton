// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary authenticate using an account name and a static key
 */
import properties from "../../properties.js";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

// Load the .env file if it exists
require("dotenv").config();

class AzureStorage {
  constructor() {
    // Enter your storage account name and shared key
    this.account = properties.accountName;
    this.accountKey = properties.accountKey;
  }

  async getSharedKeyCredential() {
    try {
      // Use StorageSharedKeyCredential with storage account and account key
      // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
      const sharedKeyCredential = new StorageSharedKeyCredential(
        this.account,
        this.accountKey
      );
      return sharedKeyCredential;
    } catch (err) {
      console.log("error in getSharedKeyCredential ==>>", err);
    }
  }

  async getBlobServiceClient() {
    try {
      const sharedKeyCredential = await this.getSharedKeyCredential();
      const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
      );
      return blobServiceClient;
    } catch (err) {
      console.log("error in getBlobServiceClient ==>>", err);
    }
  }

  async getAllContainers() {
    try {
      const containers = [];
      const blobServiceClient = this.getBlobServiceClient;
      let i = 1;
      for await (const container of blobServiceClient.listContainers()) {
        console.log(`Container ${i++}: ${container.name}`);
        containers.push(container.name);
      }
      return containers;
    } catch (err) {
      console.log("error in getAllContainers ==>>", err);
    }
  }
}

export default new AzureStorage();

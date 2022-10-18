import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";
import ShortUniqueId from "short-unique-id";
import { uniqueNamesGenerator, Config, adjectives, colors } from 'unique-names-generator';

const uid = new ShortUniqueId();

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

const shortName: string = uniqueNamesGenerator(customConfig); 

export const initiatePublishService = async ( configDetails: string) => {
  try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "clientTopic": uid(),
  "config": configDetails
});

const requestOptions:RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
      const response = await fetch(config.initiatePublish.INITIATE_PUBLISH, requestOptions)
      const responseText = await response.text();
      return { error: false, errorMessage: "", responseText };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return { error: true, errorMessage: (error as Error).message, responseText: "" };
  }
};

export const getPublishDetailsService = async (deploymentId: string, siteName: string) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          "deploymentId": deploymentId,
          "siteName": shortName
        });
        
        const requestOptions:RequestInit = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
          const response = await fetch(config.getPublish.GET_PUBLISH, requestOptions);
          const responseText = await response.text();
          return { error: false, errorMessage: "", responseText };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error in transaction --> ", error);
        return { error: true, errorMessage: (error as Error).message, responseText: "" };
    }
};

export const verifyPublishService = async (domainId: string, projectId: string) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "domainId": domainId,
          "projectId": projectId
        });
        
        const requestOptions:RequestInit = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        const response = await fetch(config.verifyPublish.VERIFY_PUBLISH, requestOptions)
        const responseText = await response.text();
        return { error: false, errorMessage: "", responseText };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error in transaction --> ", error);
      return { error: true, errorMessage: (error as Error).message, responseText: "" };
    }
};
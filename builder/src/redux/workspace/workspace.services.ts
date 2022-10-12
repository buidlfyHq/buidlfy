import { BigNumber } from "ethers";
import request, { gql } from "graphql-request";
import config from "config";

export const initiatePublishService = async (clientTopic: string, configDetails: string) => {
  try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "clientTopic": clientTopic,
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
          "siteName": siteName
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
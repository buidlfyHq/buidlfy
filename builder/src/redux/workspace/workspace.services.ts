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


export const initiatePublishService = async ( configDetails: string) => {
  try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "clientTopic": uid(),
  "config": configDetails
});
console.log(raw,"raw");

const requestOptions:RequestInit = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
      const response = await fetch(config.backendApi.BACKEND_API + "deployment/create", requestOptions)
      const responseText = await response.text();
      return { error: false, errorMessage: "", responseText };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error,"error");   
    console.error("Error in transaction --> ", error);
    return { error: true, errorMessage: (error as Error).message, responseText: "" };
  }
};

export const getPublishDetailsService = async (deploymentId: string) => {
  
      try {
        const myHeaders = new Headers();
        const shortName: string = uniqueNamesGenerator(customConfig); 
        myHeaders.append("Content-Type", "application/json");
        console.log(deploymentId,"deploymentId")
        const raw = JSON.stringify({
          "deploymentId": deploymentId,
          "siteName": shortName
        });
        console.log(raw,"getPublishDetailsService")

        const requestOptions:RequestInit = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
          const response = await fetch(config.backendApi.BACKEND_API + "deployment/create-subdomain", requestOptions);
        const responseText = await response.text();
        console.log(responseText,"responseText"); 
          return { error: false, errorMessage: "", responseText };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error,"error");   
        console.error("Error in transaction --> ", error);
        return { error: true, errorMessage: (error as Error).message, responseText: "" };
    }
};

export const verifyPublishService = async (domainId: string, projectId: string) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      console.log(domainId, "domainId");
      console.log(projectId,"projectId")
        const raw = JSON.stringify({
          "domainId": domainId,
          "projectId": projectId
        });
        console.log(raw,"raw")
        const requestOptions:RequestInit = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        const response = await fetch(config.backendApi.BACKEND_API + "deployment/verify-subdomain", requestOptions)
        const responseText = await response.text();
        return { error: false, errorMessage: "", responseText };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error in transaction --> ", error);
      return { error: true, errorMessage: (error as Error).message, responseText: "" };
    }
};
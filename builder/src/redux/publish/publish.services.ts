import config from "config";
import ShortUniqueId from "short-unique-id";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
} from "unique-names-generator";

const uid = new ShortUniqueId({ length: 12 });

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: "-",
  length: 2,
};

export const initiatePublishService = async (configDetails: string) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const publishId = uid();
    const raw = JSON.stringify({
      clientTopic: publishId,
      config: configDetails,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const response = await fetch(
      config.backendApi.BACKEND_API + "deployment/create",
      requestOptions
    );
    const responseText = await response.text();
    return { error: false, errorMessage: "", responseText, publishId };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      responseText: "",
      publishId: "",
    };
  }
};

export const getPublishDetailsService = async (deploymentId: string) => {
  try {
    const myHeaders = new Headers();
    const shortName: string = uniqueNamesGenerator(customConfig);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      deploymentId: deploymentId,
      siteName: shortName,
    });
    const requestOptions: RequestInit = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      config.backendApi.BACKEND_API + "deployment/create-subdomain",
      requestOptions
    );
    const responseText = await response.text();
    return { error: false, errorMessage: "", responseText };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      responseText: "",
    };
  }
};

export const verifyPublishService = async (
  domainId: string,
  projectId: string
) => {
  return await new Promise((resolve) => {
    let counter = 0;
    let errorMessage: string;
    let responseText: string;
    let error: boolean;
    let i = setInterval(async function () {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          domainId: domainId,
          projectId: projectId,
        });
        const requestOptions: RequestInit = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        const response = await fetch(
          config.backendApi.BACKEND_API + "deployment/verify-subdomain",
          requestOptions
        );
        responseText = await response.text();
        error = false;
        errorMessage = "";
      } catch (error) {
        // eslint-disable-next-line no-console
        errorMessage = error.message;
        responseText = "";
        error = true;
        console.error("Error in transaction --> ", error);
      }
      counter++;
      if (counter === 10 || JSON.parse(responseText)?.data?.success) {
        clearInterval(i);
        resolve({ error, errorMessage, responseText });
        return;
      }
    }, 5000);
    // return { error, errorMessage, responseText };
  });
};

export const updatePublishService = async (
  domainId: string,
  deploymentId: string
) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      subdomainId: domainId,
      deploymentId: deploymentId,
    });
    const requestOptions: RequestInit = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      config.backendApi.BACKEND_API + "deployment/update-subdomain",
      requestOptions
    );
    const responseText = await response.text();
    return { error: false, errorMessage: "", responseText };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      responseText: "",
    };
  }
};

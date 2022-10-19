import publishActionTypes from "./workspace.types";

export const initiatePublish = (payload: {
    configDetails: string
}) => ({    
    type: publishActionTypes.INITIATE_PUBLISH,
    payload
});

export const getPublishDetails = (payload: {
    deploymentId: string,
    siteName: string
}) => ({
    type: publishActionTypes.PUBLISH_DETAILS,
    payload
});

export const verifyPublish = (payload: {
    domainId: string,
    projectId: string
}) => ({
    type: publishActionTypes.VERIFY_PUBLISH,
    payload
});


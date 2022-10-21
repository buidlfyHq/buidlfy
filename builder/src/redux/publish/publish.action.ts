import publishActionTypes from "./publish.types";

export const initiatePublish = (payload: {
    configDetails: string
}) => ({    
    type: publishActionTypes.INITIATE_PUBLISH,
    payload
});

export const getPublishDetails = (payload: {
    deploymentId: string,
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

export const updatePublish = (payload: {
    domainId: string,
    deploymentId: string
}) => ({
    type: publishActionTypes.UPDATE_PUBLISH,
    payload
});


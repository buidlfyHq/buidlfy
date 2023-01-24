import { createAsyncThunk } from '@reduxjs/toolkit';
import ShortUniqueId from 'short-unique-id';
import config from 'config';
import { adjectives, colors, Config, uniqueNamesGenerator } from 'unique-names-generator';
import { ISession } from 'redux/user/user.interfaces';

const uid = new ShortUniqueId({ length: 12 });

const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: '-',
  length: 2,
};

export const initiatePublishAsync = createAsyncThunk('publish/initiatePublish', async (payload: { configDetails: string }, { rejectWithValue }) => {
  const { configDetails } = payload;
  try {
    const session: ISession = JSON.parse(localStorage.getItem('session'));
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${session?.nonce}`);
    const publishId: string = uid();
    const raw = JSON.stringify({
      clientTopic: publishId,
      config: configDetails,
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${config.server.SERVER}deployment/create`, requestOptions);
    const responseText = await response.text();
    const deploymentId = JSON.parse(responseText).data.deploymentId;
    localStorage.setItem('deployment', deploymentId);
    return { publishId, publishFailed: false, deploymentId, currentStep: 1 };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in initiatePublishAsync --> ', error);
    return rejectWithValue(error);
  }
});

export const fetchPublishDetailsAsync = createAsyncThunk(
  'publish/fetchPublishDetails',
  async (payload: { deploymentId: string }, { dispatch, rejectWithValue }) => {
    const { deploymentId } = payload;
    try {
      const session: ISession = JSON.parse(localStorage.getItem('session'));
      const myHeaders = new Headers();
      const shortName: string = uniqueNamesGenerator(customConfig);
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${session?.nonce}`);
      const raw = JSON.stringify({
        deploymentId: deploymentId,
        siteName: shortName,
      });
      const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(config.server.SERVER + 'deployment/create-subdomain', requestOptions);
      const responseText = await response.text();
      const domainId = JSON.parse(responseText).data.domain._id;
      const projectId = JSON.parse(responseText).data.domain.projectId;
      const domainName = JSON.parse(responseText).data.domain.name;
      if (domainId) {
        localStorage.setItem('domain', domainId);
      }
      localStorage.setItem('domainName', domainName);

      dispatch(verifyPublishAsync({ domainId, projectId }));
      return { domainName, projectId, currentStep: 5 };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in fetchPublishDetailsAsync --> ', error);
      return rejectWithValue(error);
    }
  },
);

export const verifyPublishAsync = createAsyncThunk(
  'publish/verifyPublish',
  async (payload: { domainId: string; projectId: string }, { rejectWithValue }) => {
    const { domainId, projectId } = payload;
    try {
      const session: ISession = JSON.parse(localStorage.getItem('session'));
      await new Promise((resolve: any) => {
        let counter = 0;
        let errorMessage: string;
        let responseText: string;
        let error: boolean;

        let i = setInterval(async () => {
          try {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', `Bearer ${session?.nonce}`);

            const raw = JSON.stringify({
              domainId,
              projectId,
            });

            const requestOptions: RequestInit = {
              method: 'PATCH',
              headers: myHeaders,
              body: raw,
              redirect: 'follow',
            };

            const response = await fetch(config.server.SERVER + 'deployment/verify-subdomain', requestOptions);
            responseText = await response.text();
            error = false;
            errorMessage = '';
          } catch (error) {
            // eslint-disable-next-line no-console
            errorMessage = error.message;
            responseText = '';
            console.error('Error in verifyPublishAsync --> ', error);
          }
          counter++;
          if (counter === 10 || JSON.parse(responseText)?.data?.success) {
            clearInterval(i);
            resolve({ error, errorMessage, responseText });
            return;
          }
        }, 5000);
      });
      return { currentStep: 6 };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in verifyPublishAsync --> ', error);
      return rejectWithValue(error);
    }
  },
);

export const updatePublishAsync = createAsyncThunk(
  'publish/updatePublish',
  async (payload: { domainId: string; deploymentId: string }, { rejectWithValue }) => {
    const { domainId, deploymentId } = payload;
    try {
      const session: ISession = JSON.parse(localStorage.getItem('session'));
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${session?.nonce}`);

      const raw = JSON.stringify({
        subdomainId: domainId,
        deploymentId,
      });

      const requestOptions: RequestInit = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch(config.server.SERVER + 'deployment/update-subdomain', requestOptions);
      const responseText = await response.text();
      const domainName = JSON.parse(responseText).data.domain.name;
      localStorage.setItem('domainName', domainName);
      console.log('Update subdomain completed'); // required
      return { currentStep: 6 };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in updatePublishAsync --> ', error);
      return rejectWithValue(error);
    }
  },
);

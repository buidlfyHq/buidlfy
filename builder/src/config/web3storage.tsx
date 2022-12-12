import { Web3Storage } from 'web3.storage';
import { Buffer } from 'buffer';

function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg';
}

function makeStorageClient() {
  return new Web3Storage({
    token: getAccessToken(),
    endpoint: new URL('https://api.web3.storage'),
  });
}

export const uploadTemplateToWeb3Storage = async (data: string): Promise<string> => {
  const onRootCidReady = (cid: string) => {
    console.log('uploading files with cid:', cid);
  };

  const client = makeStorageClient();
  const cid = await client.put([new File([Buffer.from(data)], '')], {
    wrapWithDirectory: false,
    onRootCidReady,
  });
  return `https://${cid}.ipfs.dweb.link/`;
};

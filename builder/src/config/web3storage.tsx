import { Web3Storage } from "web3.storage";
import { Buffer } from "buffer";

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg";
}

function makeStorageClient() {
  return new Web3Storage({
    token: getAccessToken(),
    endpoint: new URL("https://api.web3.storage"),
  });
}

const getBuffer = (content: string, base64: boolean): Buffer => {
  return base64 ? Buffer.from(content, "base64") : Buffer.from(content);
};

const parseDataUri = (
  dataUri: string
): { mimeType: string; base64encoded: boolean; fileContent: string } => {
  const [metaData, fileContent] = dataUri.split(",");
  const [mimeType, base64] = metaData.substring(5).split(";");
  return {
    mimeType,
    base64encoded: base64 != null,
    fileContent,
  };
};

const createFileFromContent = (dataUri: string): File => {
  const parsed = parseDataUri(dataUri);
  return new File([getBuffer(parsed.fileContent, parsed.base64encoded)], "");
};

export const uploadFileToWeb3Storage = async (
  dataUri: string
): Promise<string> => {
  const file: File = createFileFromContent(dataUri);
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = file.size;
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = 100 * (uploaded / totalSize);
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const client = makeStorageClient();
  const cid = await client.put([file], {
    wrapWithDirectory: false,
    onRootCidReady,
    onStoredChunk,
  });
  return `https://${cid}.ipfs.dweb.link/`;
};

export const uploadTemplateToWeb3Storage = async (
  data: string
): Promise<string> => {
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  const client = makeStorageClient();
  const cid = await client.put([new File([Buffer.from(data)], "")], {
    wrapWithDirectory: false,
    onRootCidReady,
  });
  return `https://${cid}.ipfs.dweb.link/`;
};

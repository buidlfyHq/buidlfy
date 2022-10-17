import { Web3Storage } from "web3.storage";
import { Buffer } from "buffer";
import config from "config";

function makeStorageClient() {
  return new Web3Storage({
    token: config.web3.WEB3_STORAGE_ACCESS_TOKEN,
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
  const onRootCidReady = (cid) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = file.size;
  let uploaded = 0;

  const onStoredChunk = (size) => {
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
  return `https://${cid}.ipfs.w3s.link/`;
};

import { SiweMessage } from 'siwe';
import config from 'config';

export const createSiweMessage = async (address: string, statement: string) => {
  const res = await fetch(`${config.server.SERVER}/nonce`, {
    credentials: 'include',
  });

  const domain = window.location.host;
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: 1,
    nonce: await res.text(),
  });
  return message.prepareMessage();
};

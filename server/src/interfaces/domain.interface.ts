export interface IDnsRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT';
  name: string;
  content: string;
  ttl: number;
}

export interface IDomain {
  _id: string;
  name: string;
  link: string;
  isLatest: boolean;
  type: DomainTypeEnum;
  verified: boolean;
  projectId: string;
  deploymentEnvironmentIds: string[];
  version: string;
}

export enum DomainTypeEnum {
  DOMAIN = 'domain',
  SUBDOMAIN = 'subdomain',
  HANDSHAKE_DOMAIN = 'handshake-domain',
  HANDSHAKE_SUBDOMAIN = 'handshake-subdomain',
  ENS_DOMAIN = 'ens-domain',
}

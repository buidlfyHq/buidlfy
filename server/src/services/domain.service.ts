import { SITE_DOMAIN_NAME, SPHERON_API_HOST } from '@/config';
import Logger from '@/logger';
import { generateRandomHexString, spheronAuthHeaders } from '@/utils/util';
import axios, { AxiosResponse } from 'axios';
import CloudflareService from './cloudflare.service';

class DomainService {
  cloudflareService = new CloudflareService();

  public async generateSitename(sitename: string, projectId: string, deploymentLink: string): Promise<any> {
    const randomString: string = generateRandomHexString(6);
    const siteNameNormalized = sitename.replace(/\s/g, '-').replace(/\./g, '-').replace(/_/g, '-');
    Logger.info(`Site name normalised - ${siteNameNormalized}`);

    const defaultDomainSuffix = `-${randomString}.${SITE_DOMAIN_NAME}`;
    const siteNameNormalizedSliced = siteNameNormalized.slice(0, 64 - defaultDomainSuffix.length); // take only first (N - domainSuffix) characters because limit on DNS name length is 64
    const subdomainName: string = `${siteNameNormalizedSliced}${defaultDomainSuffix}`.toLowerCase();
    Logger.info(`Site name normalised - ${subdomainName}`);

    const res = await Promise.all([
      this.cloudflareService.addSubdomain(subdomainName),
      this.addSubdomainToSpheron(subdomainName, projectId, deploymentLink),
    ]);
    return res[1].data;
  }

  private async addSubdomainToSpheron(subdomainName: string, projectId: string, link: string): Promise<AxiosResponse> {
    const payload = {
      name: subdomainName,
      link,
      type: 'subdomain',
      deploymentEnvironments: [],
      isLatest: false,
    };
    return axios.post(`${SPHERON_API_HOST}/v1/project/${projectId}/domains`, payload, { headers: spheronAuthHeaders });
  }

  public async updateSubdomainLink(subdomainId: string, projectId: string, link: string): Promise<AxiosResponse> {
    const payload = {
      link,
    };
    return axios.put(`${SPHERON_API_HOST}/v1/project/${projectId}/domains/${subdomainId}`, payload, { headers: spheronAuthHeaders });
  }

  public async verifySubdomain(subdomainId: string, projectId: string): Promise<AxiosResponse> {
    const payload = {};
    return axios.put(`${SPHERON_API_HOST}/v1/project/${projectId}/domains/${subdomainId}/verify`, payload, { headers: spheronAuthHeaders });
  }

  public async getDomain(projectId: string, domain: string): Promise<AxiosResponse> {
    return axios.get(`${SPHERON_API_HOST}/v1/project/${projectId}/domains/${domain}/`, { headers: spheronAuthHeaders });
  }
}

export default DomainService;

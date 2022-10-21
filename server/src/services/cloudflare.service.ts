import { CDN_CNAME, CLOUDFLARE_EMAIL, CLOUDFLARE_KEY, CLOUDFLARE_ZONE_ID } from '@/config';
import { IDnsRecord } from '@/interfaces/domain.interface';
import Cloudflare from 'cloudflare';

class CloudflareService {
  private cloudflareClient: Cloudflare;

  constructor() {
    this.cloudflareClient = new Cloudflare({
      email: CLOUDFLARE_EMAIL,
      key: CLOUDFLARE_KEY,
    });
  }

  public async addSubdomain(name: string): Promise<Cloudflare.ResponseObjectPromise> {
    const record: IDnsRecord = {
      type: 'CNAME',
      name,
      content: CDN_CNAME,
      ttl: 300,
    };
    return this.cloudflareClient.dnsRecords.add(CLOUDFLARE_ZONE_ID, record);
  }
}

export default CloudflareService;

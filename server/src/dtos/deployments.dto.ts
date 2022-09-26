import { IsString } from 'class-validator';

export class DeployAppDto {
  @IsString()
  public config: string;

  @IsString()
  public name: string;
}

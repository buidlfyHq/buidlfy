import { IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  public data: string;
}

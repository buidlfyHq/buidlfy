import { IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  public message: string;

  @IsString()
  public signature: string;

  @IsString()
  public address: string;

  @IsString()
  public walletName: string;
}

export class VerifyTwitterDto {
  @IsString()
  public twitterHandle: string;
}

export class SubscribeNewsletterDto {
  @IsString()
  public email: string;
}

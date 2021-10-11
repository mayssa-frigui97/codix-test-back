/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  password: string;
}

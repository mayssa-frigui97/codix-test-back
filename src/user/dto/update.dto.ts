/* eslint-disable prettier/prettier */
import { IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import { CountryEnum } from '../enum/country.enum';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    nickname: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    confirmPassword: string;
  
    @IsOptional()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsEnum(CountryEnum)
    country: CountryEnum;
}

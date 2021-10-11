/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { CountryEnum } from '../enum/country.enum';

export class AddUserDto {
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsEnum(CountryEnum)
    country: CountryEnum;
}

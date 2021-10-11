import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddUserDto } from './dto/add.dto';
import { UpdateUserDto } from './dto/update.dto';
import { User } from './entities/user.entity';
import { CountryEnum } from './enum/country.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/countries')
  async getCountries(): Promise<CountryEnum[]> {
    return await this.userService.getCountries();
  }

  @Post()
  async addUser(@Body() adduserDto: AddUserDto): Promise<User> {
    return await this.userService.addUser(adduserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async UpdateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id') //toujours en bas
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }
}

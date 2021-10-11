import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add.dto';
import { UpdateUserDto } from './dto/update.dto';
import { User } from './entities/user.entity';
import { CountryEnum } from './enum/country.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepos.find();
  }

  async getCountries(): Promise<CountryEnum[]> {
    const list: CountryEnum[] = [];
    list.push(
      CountryEnum.BULGARIA,
      CountryEnum.FRANCE,
      CountryEnum.MEXICO,
      CountryEnum.SPAIN,
      CountryEnum.TUNISIA,
      CountryEnum.USA,
      CountryEnum.VIETNAM,
    );
    return list;
  }

  async addUser(userDto: AddUserDto): Promise<User> {
    const { nickname, password, confirmPassword, email, phone, country } =
      userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepos.createQueryBuilder('user');
    const query = userInDb
      .where('user.nickname= :nickname', { nickname })
      .orWhere('user.email= :email', { email });
    if (query.getOne()) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    } else if (confirmPassword !== password) {
      throw new HttpException(
        'Confirmation password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = await this.userRepos.create({
      nickname,
      password,
      confirmPassword,
      email,
      phone,
      country,
    });
    const createdUser = await this.userRepos.save(user);
    return this.userRepos.findOne(createdUser.id);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    const newUser = await this.userRepos.preload({
      id,
      ...user,
    });
    if (!newUser) {
      throw new NotFoundException(`user d'id ${id} n'exsite pas!`);
    } else if (user.confirmPassword !== user.password) {
      throw new HttpException(
        'Confirmation password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepos.save(newUser);
  }

  async findById(idUser: number) {
    const personne = await this.userRepos.findOne(idUser);
    if (!personne) {
      throw new NotFoundException(`Le personne d'id ${idUser} n'exsite pas!`);
    }
    return personne;
  }
}

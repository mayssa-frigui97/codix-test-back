import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signin(credentials: CredentialsDto, user: User): Promise<any> {
    const { nickname, password } = credentials;
    const person = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.nickname = :nickname', { nickname })
      .getOne();
    console.log('user auth:', person);
    if (!person) {
      throw new NotFoundException(
        'You have entered an invalid username or password',
      );
    }

    if (password == person.password) {
      const payload = {
        id: person.id,
        nickname: person.nickname,
      };
      user = person;
      const jwt = this.jwtService.sign(payload);
      delete user.password;
      console.log('here user auth:', user);
      return {
        access_token: jwt,
        user: user,
      };
    } else {
      throw new NotFoundException(
        'You have entered an invalid username or password',
      );
    }
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  login(@Body() Credentials: CredentialsDto, @User() user): Promise<any> {
    return this.authservice.signin(Credentials, user);
  }
}

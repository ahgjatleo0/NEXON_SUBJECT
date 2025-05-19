import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    console.log('🔐 JWT_SECRET from process.env:', process.env.JWT_SECRET);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { email: user.email, role: user.role, sub: user._id, };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

    @UseGuards(AuthGuard('jwt'), RolesGuard) 
    @Roles('ADMIN')
    @Get('admin-check')
    adminOnly(@Request() req) {
    console.log('🔐 req.user =', req.user);
    return {
        message: `안녕하세요, ${req.user.email} 관리자님!`,
        role: req.user.role,
    };
    }
}

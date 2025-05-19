import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { RewardRequestsService } from './reward-requests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('reward-requests')
export class RewardRequestsController {
  constructor(private readonly service: RewardRequestsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')  // ✅ 일반 유저만 요청 가능
  @Post()
  create(@Body() body, @Request() req) {
    const userId = req.user.sub;
    console.log('💬 req.user =', req.user);
    return this.service.create({
      ...body,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'OPERATOR')
  @Get()
  findAll() {
    return this.service.findAll();
  }
}

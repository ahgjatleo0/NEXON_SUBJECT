import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { JwtModule } from '@nestjs/jwt';
import { RewardsModule } from './rewards/rewards.module';
import { RewardRequestsModule } from './reward-requests/reward-requests.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EventsModule,
    RewardsModule,
    RewardRequestsModule,
  ],
})
export class AppModule {}

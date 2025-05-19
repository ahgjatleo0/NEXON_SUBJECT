import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { Model } from 'mongoose';

@Injectable()
export class RewardsService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<RewardDocument>) {}

  create(data: any) {
    return this.rewardModel.create(data);
  }

  findAll() {
    return this.rewardModel.find().populate('eventId').exec();
  }
}

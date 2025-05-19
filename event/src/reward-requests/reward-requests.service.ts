import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestDocument } from './schemas/reward-request.schema';
import { Model } from 'mongoose';

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequestDocument>,
  ) {}

  create(data: any) {
    console.log('🔥 저장할 reward request:', data);
    return this.rewardRequestModel.create(data);
  }

  findAll() {
    return this.rewardRequestModel.find().populate('rewardId').exec();
  }
}

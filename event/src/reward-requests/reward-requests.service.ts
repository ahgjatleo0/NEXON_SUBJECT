import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestDocument } from './schemas/reward-request.schema';
import { Reward, RewardDocument } from '../rewards/schemas/reward.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class RewardRequestsService {
  constructor(
    @InjectModel(RewardRequest.name)
    private rewardRequestModel: Model<RewardRequestDocument>,
    @InjectModel(Reward.name)
    private rewardModel: Model<RewardDocument>, 
  ) {}

  create(data: any) {
    return this.rewardRequestModel.create(data);
  }

  findAll() {
    return this.rewardRequestModel.find().populate('rewardId').exec();
  }

  async updateStatus(id: string, status: string) {
    const allowedStatuses = ['APPROVED', 'REJECTED'];
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException('status must be APPROVED or REJECTED');
    }

    return this.rewardRequestModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }

    async findByEvent(eventId: string) {
    console.log('📌 [findByEvent] 요청 받은 eventId:', eventId);

    const rewards = await this.rewardModel
        .find({ 'eventId._id': new Types.ObjectId(eventId) })  // 또는 .find({ eventId: new Types.ObjectId(eventId) })
        .exec();

    console.log('🔍 찾은 rewards:', rewards);

    const rewardIds = rewards.map((r) => r._id);
    console.log('✅ rewardIds 추출:', rewardIds);

    const result = await this.rewardRequestModel
        .find({ rewardId: { $in: rewardIds } })
        .populate('rewardId')
        .exec();

    console.log('📥 최종 요청 결과:', result);

    return result;
    }

    async findByUser(userId: string) {
  return this.rewardRequestModel
    .find({ userId })
    .populate('rewardId')
    .exec();
}
}

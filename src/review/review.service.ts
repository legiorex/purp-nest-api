import { Injectable } from '@nestjs/common';
import { ReviewModel } from './model/review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteResult, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewModel.create(dto);
  }
  async delete(id: string): Promise<ReviewModel | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId).toHexString() }).exec();
  }

  async deleteByProductId(productId: string): Promise<DeleteResult> {
    return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
  }
}

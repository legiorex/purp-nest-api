import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './model/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { USER_ALREADY_EXIST } from './const';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {}

  async createUser({ email, password }: AuthDto) {
    const finedUser = await this.findUser(email);
    if (finedUser) {
      throw new HttpException(USER_ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    const salt = genSaltSync(10);
    const passwordHash = hashSync(password, salt);

    const user = new this.userModel({
      email,
      passwordHash,
    });
    return user.save();
  }

  async findUser(email: string) {
    return this.userModel
      .findOne({
        email,
      })
      .exec();
  }
}

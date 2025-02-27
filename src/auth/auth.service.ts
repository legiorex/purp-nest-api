import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './model/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_ALREADY_EXIST, USER_NOT_FOUND, WRONG_PASSWORD } from './const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({ email, password }: AuthDto) {
    const finedUser = await this.findUser(email);
    if (finedUser) {
      throw new HttpException(USER_ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

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

  async validateUser({ email, password }: AuthDto): Promise<Pick<UserModel, 'email'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const isPasswordMatch = await compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      throw new HttpException(WRONG_PASSWORD, HttpStatus.UNAUTHORIZED);
    }

    return { email: user.email };
  }

  async getAccessToken(email: string) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(dto: AuthDto) {
    const { email } = await this.validateUser(dto);
    return this.getAccessToken(email);
  }
}

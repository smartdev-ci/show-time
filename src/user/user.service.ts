/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from 'src/schemas/Users.schema';

@Injectable()
export class UserService {
  register(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  buildUserResponse: any;
  validateUser: any;
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({ id });
  }

  async findByid(_id: string) {
    return this.userModel.findById(_id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async findByidandupdate(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, { $set: { ...updateUserDto } });
  }
}

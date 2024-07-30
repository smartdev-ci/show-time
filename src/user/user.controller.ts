/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Render,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Render('dashboard/users/all-users')
  async findAll() {
    const user = await this.userService.findAll();
    console.log(user);
    return { user };
  }

  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.userService.createUser(createUserDto);
    return res.redirect('/user');
  }

  @Get('update-user/:_id')
  @Render('dashboard/users/update-user')
  async findOneToUpdate(@Param('_id') _id: string) {
    const user = await this.userService.findByid(_id);
    console.log(user);
    return { user };
  }

  @Post('update-user/:_id')
  async updateUser(
    @Param('_id') _id: string,
    @Body() UpdateUserDto: UpdateUserDto,
    @Res() response: any,
  ) {
    console.log(UpdateUserDto);

    // const response = await this.usersService.findByid(id);
    // await this.userService.update(_id, UpdateUserDto);
    // response.redirect('/users/dashuser/' + id);
  }
  // @Get('login')
  // @Render('login')
  // showLogin() {
  //   return;
  // }
}

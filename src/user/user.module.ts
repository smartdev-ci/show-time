import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { UserEntity, UserEntitySchema } from './entities/user.entity';
import { User, UserSchema } from 'src/schemas/Users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

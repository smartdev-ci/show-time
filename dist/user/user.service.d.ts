import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from 'src/schemas/Users.schema';
export declare class UserService {
    private userModel;
    register(username: string, password: string): void;
    buildUserResponse: any;
    validateUser: any;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[], import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, UserDocument, "find", {}>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>, {}, UserDocument, "findOne", {}>;
    findByid(_id: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").UpdateWriteOpResult>;
    remove(id: number): string;
    loginUser(loginDto: LoginDto): Promise<User>;
    findByidandupdate(_id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").UpdateWriteOpResult>;
}

import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<{
        user: (import("mongoose").Document<unknown, {}, import("../schemas/Users.schema").UserDocument> & import("../schemas/Users.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>)[];
    }>;
    create(createUserDto: CreateUserDto, res: Response): Promise<void>;
    findOneToUpdate(_id: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../schemas/Users.schema").UserDocument> & import("../schemas/Users.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }>;
    }>;
    updateUser(_id: string, UpdateUserDto: UpdateUserDto, response: any): Promise<void>;
}

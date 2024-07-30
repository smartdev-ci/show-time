"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const Users_schema_1 = require("../schemas/Users.schema");
let UserService = class UserService {
    register(username, password) {
        throw new Error('Method not implemented.');
    }
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const user = await this.userModel.findOne({ email: createUserDto.email });
        if (user) {
            throw new common_1.HttpException('Email is already taken', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    findAll() {
        return this.userModel.find();
    }
    findOne(id) {
        return this.userModel.findOne({ id });
    }
    async findByid(_id) {
        return this.userModel.findById(_id);
    }
    async update(id, updateUserDto) {
        return this.userModel.updateOne({ _id: id }, { $set: updateUserDto });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async loginUser(loginDto) {
        const user = await this.userModel
            .findOne({ email: loginDto.email })
            .select('+password');
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const isPasswordCorrect = await (0, bcrypt_1.compare)(loginDto.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.HttpException('Incorrect password', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return user;
    }
    async findByidandupdate(_id, updateUserDto) {
        return this.userModel.updateOne({ _id }, { $set: { ...updateUserDto } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map
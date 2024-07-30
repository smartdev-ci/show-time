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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const events_service_1 = require("./events/events.service");
const user_service_1 = require("./user/user.service");
const login_dto_1 = require("./user/dto/login.dto");
const create_user_dto_1 = require("./user/dto/create-user.dto");
const create_reservation_dto_1 = require("./reservation/dto/create-reservation.dto");
const reservation_service_1 = require("./reservation/reservation.service");
const qrcode_1 = require("qrcode");
const type_event_service_1 = require("./type-event/type-event.service");
let AppController = class AppController {
    constructor(appService, eService, uService, rService, tService) {
        this.appService = appService;
        this.eService = eService;
        this.uService = uService;
        this.rService = rService;
        this.tService = tService;
    }
    async getHello(req, res) {
        const userTypeCookie = req.cookies ? req.cookies['UserType'] : undefined;
        let admin;
        let standard;
        let nothing;
        if (userTypeCookie === '1') {
            admin = true;
        }
        else if (userTypeCookie === '0') {
            standard = true;
        }
        else {
            nothing = true;
        }
        const types = await this.tService.findAll();
        const event = await this.eService.findAll();
        console.log(event);
        console.log(types);
        return { event, admin, standard, nothing, types };
    }
    showLogin(req, res) {
        const userIdCookie = req.cookies ? req.cookies['UserId'] : undefined;
        if (userIdCookie) {
            return res.redirect('http://localhost:3000');
        }
        else {
            return res.render('login');
        }
    }
    showRegister() {
        return;
    }
    async register(createUserDto, res) {
        await this.uService.createUser(createUserDto);
        return res.redirect('login');
    }
    async findAllEvent() {
        const event = await this.eService.findAll();
        console.log(event);
        return { event };
    }
    async findOne(_id) {
        const onevent = await this.eService.findOne(_id);
        console.log(onevent);
        return { onevent };
    }
    async showBooking(_id, req, res) {
        const userId = req.cookies['UserId'];
        if (!userId) {
            res.redirect('/login');
        }
        const event = await this.eService.findOne(_id);
        const user = await this.uService.findOne(userId);
        return { user, event };
    }
    async pay(createReservationDto, res, req) {
        const userIdCookie = req.cookies ? req.cookies['UserId'] : undefined;
        const data = await this.rService.create(createReservationDto);
        console.log(data);
        return res.redirect('/users/profile/' + userIdCookie);
    }
    async showProfile(req) {
        const generateQR = async (text) => {
            try {
                return await qrcode_1.default.toDataURL(text);
            }
            catch (err) {
                console.error('Error generating QR code:', err);
                return '';
            }
        };
        const userId = req.cookies['UserId'];
        const user = await this.uService.findOne(userId);
        const resByUser = await this.rService.findByUserId(userId);
        console.log(resByUser);
        const qr = generateQR('https://google.com');
        console.log(qr);
        return { resByUser, user, qr };
    }
    async login(loginDto, res) {
        const user = await this.uService.loginUser(loginDto);
        if (!user) {
            return res.redirect('/user/register');
        }
        res.cookie('UserId', user['_id'].toString(), {
            maxAge: 600000,
            httpOnly: true,
        });
        res.cookie('UserType', user['is_admin'], {
            maxAge: 600000,
            httpOnly: true,
        });
        return user['is_admin'] == 1
            ? res.redirect('/dashboard')
            : res.redirect('http://localhost:3000');
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "showLogin", null);
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.Render)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "showRegister", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('/users/events'),
    (0, common_1.Render)('users/events/all-events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findAllEvent", null);
__decorate([
    (0, common_1.Get)('/users/events/:_id'),
    (0, common_1.Render)('users/events/event'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/users/reservation/:_id'),
    (0, common_1.Render)('users/reservation/paiement'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "showBooking", null);
__decorate([
    (0, common_1.Post)('/users/reservation/:_id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "pay", null);
__decorate([
    (0, common_1.Get)('/users/profile/:_id'),
    (0, common_1.Render)('users/profile/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "showProfile", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        events_service_1.EventsService,
        user_service_1.UserService,
        reservation_service_1.ReservationService,
        type_event_service_1.TypeEventService])
], AppController);
//# sourceMappingURL=app.controller.js.map
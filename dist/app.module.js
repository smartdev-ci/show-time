"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const events_module_1 = require("./events/events.module");
const user_module_1 = require("./user/user.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const type_event_module_1 = require("./type-event/type-event.module");
const reservation_module_1 = require("./reservation/reservation.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://adouko_94:arioPIGIER94@cluster0.lg62tkh.mongodb.net/eventplace'),
            user_module_1.UserModule,
            events_module_1.EventsModule,
            user_module_1.UserModule,
            dashboard_module_1.DashboardModule,
            type_event_module_1.TypeEventModule,
            reservation_module_1.ReservationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
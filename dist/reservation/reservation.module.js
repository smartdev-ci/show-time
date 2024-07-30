"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("./reservation.service");
const reservation_controller_1 = require("./reservation.controller");
const mongoose_1 = require("@nestjs/mongoose");
const Reservation_schema_1 = require("../schemas/Reservation.schema");
const events_module_1 = require("../events/events.module");
const user_module_1 = require("../user/user.module");
let ReservationModule = class ReservationModule {
};
exports.ReservationModule = ReservationModule;
exports.ReservationModule = ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Reservation_schema_1.Reservation.name, schema: Reservation_schema_1.ReservationSchema },
            ]),
            events_module_1.EventsModule,
            user_module_1.UserModule,
        ],
        controllers: [reservation_controller_1.ReservationController],
        providers: [reservation_service_1.ReservationService],
        exports: [reservation_service_1.ReservationService],
    })
], ReservationModule);
//# sourceMappingURL=reservation.module.js.map
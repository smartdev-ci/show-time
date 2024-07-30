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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const type_event_service_1 = require("../type-event/type-event.service");
const create_type_event_dto_1 = require("../type-event/dto/create-type-event.dto");
let EventsController = class EventsController {
    constructor(eventsService, typeEventSce) {
        this.eventsService = eventsService;
        this.typeEventSce = typeEventSce;
    }
    async create(createEventDto, res) {
        await this.eventsService.create(createEventDto);
        return res.redirect('events');
    }
    async index() {
        const types = await this.typeEventSce.findAll();
        return { types };
    }
    async createTypeEvent(createTypeEventDto, res) {
        const data = await this.typeEventSce.create(createTypeEventDto);
        console.log(data);
        return res.redirect('/events/create-event');
    }
    async findAll() {
        const event = await this.eventsService.findAll();
        console.log(event);
        return { event };
    }
    async findOne(_id) {
        const onevent = await this.eventsService.findOne(_id);
        console.log(onevent);
        return { onevent };
    }
    async findOneToUpdate(_id) {
        const types = await this.typeEventSce.findAll();
        const onevent = await this.eventsService.findOne(_id);
        console.log(onevent);
        return { onevent, types };
    }
    async update(_id, updateEventDto, res) {
        await this.eventsService.update(_id, updateEventDto);
        return res.redirect('events');
    }
    remove(_id) {
        return this.eventsService.remove(_id);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)('create-event'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('create-event'),
    (0, common_1.Render)('dashboard/events/add-event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "index", null);
__decorate([
    (0, common_1.Post)('add-type-event'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_event_dto_1.CreateTypeEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createTypeEvent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('dashboard/events/event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':_id'),
    (0, common_1.Render)('events/event-details'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('update-event/:_id'),
    (0, common_1.Render)('dashboard/events/update-event'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findOneToUpdate", null);
__decorate([
    (0, common_1.Post)('update-event/:_id'),
    __param(0, (0, common_1.Param)(':_id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        type_event_service_1.TypeEventService])
], EventsController);
//# sourceMappingURL=events.controller.js.map
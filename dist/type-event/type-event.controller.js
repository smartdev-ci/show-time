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
exports.TypeEventController = void 0;
const common_1 = require("@nestjs/common");
const type_event_service_1 = require("./type-event.service");
const create_type_event_dto_1 = require("./dto/create-type-event.dto");
const update_type_event_dto_1 = require("./dto/update-type-event.dto");
let TypeEventController = class TypeEventController {
    constructor(typeEventService) {
        this.typeEventService = typeEventService;
    }
    async create(createTypeEventDto, res) {
        const data = await this.typeEventService.create(createTypeEventDto);
        console.log(data);
        return res.redirect('events');
    }
    findAll() {
        return this.typeEventService.findAll();
    }
    findOne(id) {
        return this.typeEventService.findOne(+id);
    }
    update(id, updateTypeEventDto) {
        return this.typeEventService.update(+id, updateTypeEventDto);
    }
    remove(id) {
        return this.typeEventService.remove(+id);
    }
};
exports.TypeEventController = TypeEventController;
__decorate([
    (0, common_1.Post)('add-type-event'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_event_dto_1.CreateTypeEventDto, Object]),
    __metadata("design:returntype", Promise)
], TypeEventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('add-type-event'),
    (0, common_1.Render)('events/type-event/add-event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeEventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeEventController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_event_dto_1.UpdateTypeEventDto]),
    __metadata("design:returntype", void 0)
], TypeEventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeEventController.prototype, "remove", null);
exports.TypeEventController = TypeEventController = __decorate([
    (0, common_1.Controller)('type-event'),
    __metadata("design:paramtypes", [type_event_service_1.TypeEventService])
], TypeEventController);
//# sourceMappingURL=type-event.controller.js.map
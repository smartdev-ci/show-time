"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypeEventDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_type_event_dto_1 = require("./create-type-event.dto");
class UpdateTypeEventDto extends (0, mapped_types_1.PartialType)(create_type_event_dto_1.CreateTypeEventDto) {
}
exports.UpdateTypeEventDto = UpdateTypeEventDto;
//# sourceMappingURL=update-type-event.dto.js.map
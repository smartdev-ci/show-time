"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'src/public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'src/views'));
    hbs.registerPartials((0, path_1.join)(__dirname, '..', 'src/views/layouts'));
    app.setViewEngine('hbs');
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
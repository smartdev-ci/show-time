import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Render,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Request, Response } from 'express';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  @Render('dashboard/dashboard')
  detDashboard(@Req() req: Request, @Res() res: Response) {
    const userTypeCookie = req.cookies ? req.cookies['UserType'] : undefined;
    if (userTypeCookie === '1') {
      return;
    } else {
      return res.redirect('/');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}

import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { Request, Response } from 'express';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    create(createDashboardDto: CreateDashboardDto): string;
    detDashboard(req: Request, res: Response): void;
    findOne(id: string): string;
    update(id: string, updateDashboardDto: UpdateDashboardDto): string;
    remove(id: string): string;
}

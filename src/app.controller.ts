/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventsService } from './events/events.service';
import { UserService } from './user/user.service';
import { LoginDto } from './user/dto/login.dto';
import { Response, Request } from 'express';
import { CreateUserDto } from './user/dto/create-user.dto';
import { CreateReservationDto } from './reservation/dto/create-reservation.dto';
import { ReservationService } from './reservation/reservation.service';
import QRCode from 'qrcode';
import { TypeEventService } from './type-event/type-event.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eService: EventsService,
    private readonly uService: UserService,
    private readonly rService: ReservationService,
    private readonly tService: TypeEventService,
  ) {}

  @Get()
  @Render('index')
  async getHello(@Req() req: Request, @Res() res: Response) {
    const userTypeCookie = req.cookies ? req.cookies['UserType'] : undefined;
    let admin: boolean | undefined;
    let standard: boolean | undefined;
    let nothing: boolean;

    if (userTypeCookie === '1') {
      admin = true;
    } else if (userTypeCookie === '0') {
      standard = true;
    } else {
      nothing = true;
    }

    const types = await this.tService.findAll();
    const event = await this.eService.findAll();
    console.log(event);
    console.log(types);

    return { event, admin, standard, nothing, types };
  }

  @Get('login')
  @Render('login')
  showLogin(@Req() req: Request, @Res() res: Response) {
    const userIdCookie = req.cookies ? req.cookies['UserId'] : undefined;
    if (userIdCookie) {
      return res.redirect('http://localhost:3000');
    } else {
      return res.render('login');
    }
  }

  @Get('register')
  @Render('register')
  showRegister() {
    return;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.uService.createUser(createUserDto);
    return res.redirect('login');
  }

  @Get('/users/events')
  @Render('users/events/all-events')
  async findAllEvent() {
    const event = await this.eService.findAll();
    console.log(event);
    return { event };
  }

  @Get('/users/events/:_id')
  @Render('users/events/event')
  async findOne(@Param('_id') _id: string) {
    const onevent = await this.eService.findOne(_id);
    console.log(onevent);
    return { onevent };
  }

  @Get('/users/reservation/:_id')
  @Render('users/reservation/paiement')
  async showBooking(
    @Param('_id') _id,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = req.cookies['UserId'];

    if (!userId) {
      res.redirect('/login');
    }

    const event = await this.eService.findOne(_id);
    const user = await this.uService.findOne(userId);

    return { user, event };
  }

  @Post('/users/reservation/:_id')
  async pay(
    @Body() createReservationDto: CreateReservationDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const userIdCookie = req.cookies ? req.cookies['UserId'] : undefined;
    const data = await this.rService.create(createReservationDto);
    console.log(data);
    return res.redirect('/users/profile/' + userIdCookie);
  }

  @Get('/users/profile/:_id')
  @Render('users/profile/profile')
  async showProfile(@Req() req: Request) {
    const generateQR = async (text: string): Promise<string> => {
      try {
        return await QRCode.toDataURL(text);
      } catch (err) {
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

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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
}

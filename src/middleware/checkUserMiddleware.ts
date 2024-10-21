import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class CheckUserMiddleware implements NestMiddleware {
  constructor(private readonly customerService: CustomerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      throw new HttpException('Id must be a number', HttpStatus.BAD_REQUEST);
    }

    const customer = await this.customerService.findCustomerById(userId);
    if (!customer) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    next();
  }
}

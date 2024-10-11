import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const API_VERSION = process.env.API_VERSION;
@Controller(`${API_VERSION}/orders`)

export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    prisma = new PrismaClient();

    @Post("create")
    async createOrder(@Body() data: any) {
        try {
            console.log('data', data);
            return await this.orderService.createOrder(data);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
    @Post("check-payment")
    async checkPayment(@Body() data: any) {
        try {
            console.log('data', data);
            return await this.orderService.getOrderStatus("720767402405384551","788126879406010023162545770_1728629967662");
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    @Get("get-all")
    async getAllOrders() {
        try {
            return await this.orderService.getAllOrders();
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
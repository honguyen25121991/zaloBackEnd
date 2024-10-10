import { Injectable, HttpException, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createResponse } from '../utils/response.util'; // Import hàm tiện ích
import { logger } from '../../logger/logger'; // Import logger
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
    private readonly prisma: PrismaClient;
    private readonly date: Date;

    constructor() {
        this.prisma = new PrismaClient();
        this.date = new Date();
    }

    async createOrder(data: any) {
        dotenv.config();
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
        const dataMac = Object.keys(data)
            .sort() 
            .map(
                (key) =>
                    `${key}=${typeof data[key] === "object"
                        ? JSON.stringify(data[key])
                        : data[key]
                    }`
            ) 
            .join("&"); 

        const hmac = crypto.createHmac('sha256', PRIVATE_KEY);
        hmac.update(dataMac);
        const mac = hmac.digest('hex');
        try {
            return createResponse(200, 'Success', { mac }, this.date);
        } catch (error) {
            logger.error('Error creating order', error);
            throw new HttpException('Error creating order', 500);
        }
    }

    async getAllOrders() {
        logger.info('Get all orders'); // Log thông tin

        const result = await this.prisma.order.findMany();
        return createResponse(200, 'Success', result, this.date);
    }
}
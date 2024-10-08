import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomerService } from './customer.service';
import * as dotenv from 'dotenv';

dotenv.config();
const API_VERSION = process.env.API_VERSION;
@Controller(`${API_VERSION}/customer`)

export class CustomerController {
    prisma = new PrismaClient();
    constructor(
        private  customer: CustomerService
    ){}
    @Post('login')
    async createCustomer(
        @Body() body :{access_token:string,token :string}
    ): Promise<any> {
        const {access_token,token} = body;
        
        try {
            return await this.customer.handleLogin(
                access_token,token
            )
        } catch (error) {
            throw new HttpException("Lỗi Backend", 500)
        }
    }
    @Get('get-all')
    async getAllUser(

    ): Promise<any> {
        try {
            return await this.customer.getAllCustomers()
        } catch (error) {
            throw new HttpException("Lỗi BE", 500)
        }
    }
}

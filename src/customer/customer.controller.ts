import { Body, Controller, Get, HttpException, Post, UseInterceptors, UploadedFile, Put, Param } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomerService } from './customer.service';
import * as dotenv from 'dotenv';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';

dotenv.config();
const API_VERSION = process.env.API_VERSION;
@Controller(`${API_VERSION}/customer`)

export class CustomerController {
    prisma = new PrismaClient();
    constructor(
        private customer: CustomerService
    ) { }
    @Post('login')
    async createCustomer(
        @Body() body: { access_token: string, token: string }
    ): Promise<any> {
        const { access_token, token } = body;

        try {
            return await this.customer.handleLogin(
                access_token, token
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

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async updateCustomer(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { nameCustomer: string, phoneCustomer: string, addressCustomer: string ,imageCustomer: string }
    ) {

        const updatedCustomer = await this.customer.handleUpdateCustomer(id, 
            body,file
        );
        return updatedCustomer;
    }

    @Post('delete')
    async deleteCustomer(
        @Body() body: { id: number },

    ): Promise<any> {
        console.log('body', body);
        const { id } = body;
        try {
            return await this.customer.handleDeleteCustomer(id)
        } catch (error) {
            throw new HttpException("Lỗi Backend", 500)
        }
    }
}

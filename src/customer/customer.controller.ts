import { Body, Controller, Get, HttpException, Post, UseInterceptors, UploadedFile, Put, Param, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomerService } from './customer.service';
import * as dotenv from 'dotenv';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { diskStorage } from 'multer';
dotenv.config();
const API_VERSION = process.env.API_VERSION;
const IMGFOLDER = process.env.IMGFOLDER;

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
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, IMGFOLDER);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }))
    async updateCustomer(
      @Param('id') id: number,
      @UploadedFile() file: Express.Multer.File,
      @Body() body: { nameCustomer: string, phoneCustomer: string, addressCustomer: string, imageCustomer: string }
    ) {
      const customer = await this.customer.findCustomerById(id);
      if (!customer) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else {
        const updatedCustomer = await this.customer.handleUpdateCustomer(id, body, file);
        return updatedCustomer;
      }
    }

    @Post('delete')
    async deleteCustomer(
        @Body() body: { id: number },

    ): Promise<any> {
        const { id } = body;
        try {
            return await this.customer.handleDeleteCustomer(id)
        } catch (error) {
            throw new HttpException("Lỗi Backend", 500)
        }
    }
}



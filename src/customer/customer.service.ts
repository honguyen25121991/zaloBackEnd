import { Injectable, HttpException, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { createResponse } from '../utils/response.util'; // Import hàm tiện ích
import { logger } from '../../logger/logger'; // Import logger
import * as fs from 'fs';
import { readFileSync, existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

const HOST = process.env.HOST;

@Injectable()
export class CustomerService {
    private readonly prisma: PrismaClient;
    private readonly date: Date;

    constructor() {
        this.prisma = new PrismaClient();
        this.date = new Date();
    }

    async getAllCustomers() {
        logger.info('Get all customers'); // Log thông tin

        const result = await this.prisma.customer.findMany();
        return createResponse(200, 'Success', result, this.date);
    }

    async handleLogin(access_token: string, token: string) {
        const endpointGetPhone = "https://graph.zalo.me/v2.0/me/info";
        const endpointGetInfo = "https://graph.zalo.me/v2.0/me?fields=id,name,picture";
        const SECREKEY = process.env.SECREKEY;
        const headers = {
            'access_token': access_token,
            'code': token,
            'secret_key': SECREKEY,
        };
        try {

            // Gọi API để lấy số điện thoại
            const phoneResponse = await axios.get(endpointGetPhone, { headers });
            const phoneBody = phoneResponse.data;
            if (phoneResponse.status === 200 && phoneBody.message == 'Success') {
                const phoneNumber = phoneBody.data.number;
                // Gọi API để lấy thông tin khách hàng
                const infoResponse = await axios.get(endpointGetInfo, { headers });
                const infoBody = infoResponse.data;
                if (infoResponse.status === 200) {
                    const customer = await this.prisma.customer.findFirst({
                        where: {
                            phoneCustomer: "0" + phoneNumber
                        }
                    });

                    if (customer) {
                        return createResponse(200, 'Customer already exists', customer, this.date);
                    } else {
                        const newCustomer = await this.prisma.customer.create({
                            data: {
                                nameCustomer: infoBody.name,
                                phoneCustomer: "0" + phoneNumber,
                                imageCustomer: infoBody.picture.data.url,
                                addressCustomer: "",
                                id_zaLo: infoBody.id
                            }
                        });
                        return createResponse(201, 'Customer created', newCustomer, this.date);
                    }
                } else {
                    console.error('Failed to get customer info:', infoResponse.status);
                    throw new Error('Failed to get customer info');
                }
            } else {
                throw new Error('Failed to get phone number');
            }
        } catch (error) {
            throw new HttpException('Error making request', 500);
        }
    }

    async handleUpdateCustomer(id: number, body: { nameCustomer: string, phoneCustomer: string, addressCustomer: string, imageCustomer: string }, file: any) {
        if (isNaN(id)) {
            throw new HttpException('Id must be a number', 400);
        }
        const customerFind = await this.prisma.customer.findFirst({
            where: {
                id: +id
            }
        });
        if (!customerFind) {
            throw new HttpException('Customer not found', 404);
        }
        if (file != undefined && customerFind.imageCustomer) {
            const path = join(__dirname, '..', '..', 'uploads', customerFind.imageCustomer.split('/').pop());
            console.log('path', path);
            if (existsSync(path)) {
                unlinkSync(path);
            }
        }
        try {
            const customer = await this.prisma.customer.update({
                where: {
                    id: +id
                },
                data: {
                    nameCustomer: body.nameCustomer,
                    phoneCustomer: body.phoneCustomer,
                    addressCustomer: body.addressCustomer,
                    imageCustomer:  file != undefined ? `${HOST}/uploads/${file.filename}` : "",
                }
            });
            console.log('customer', customer);
          
            return createResponse(200, 'Update success', customer, this.date);
        } catch (error) {
            console.log('error', error);
            throw new HttpException('Error making request', 500);
        }
    }



}
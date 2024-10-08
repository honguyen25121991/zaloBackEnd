import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import * as dotenv from 'dotenv';

dotenv.config();
const API_VERSION = process.env.API_VERSION;
@Controller(`${API_VERSION}/books`)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body() book) {
    this.bookService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedBook) {
    this.bookService.update(id, updatedBook);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.bookService.remove(id);
  }
  @Get('test-connect')
  testConnect() {
    return { message: 'Connection successful' };
  }
}
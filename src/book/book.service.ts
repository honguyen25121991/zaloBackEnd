import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  private books = [];

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find(book => book.id === id);
  }

  create(book) {
    this.books.push(book);
  }

  update(id: number, updatedBook) {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex > -1) {
      this.books[bookIndex] = updatedBook;
    }
  }

  remove(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
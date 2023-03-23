import {
  Body,
  Post,
  Get,
  Put,
  Delete,
  Controller,
  Param,
} from '@nestjs/common';
import { BookDTO } from './books.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post() // rota post
  async create(@Body() data: BookDTO) {
    return this.booksService.create(data);
  }

  @Get() // rota get
  async findAll() {
    return this.booksService.findAll();
  }

  // localhost:3000/1 = 1 é o id precisa de um nome
  @Put(':id') // rota put
  async update(@Param('id') id: string, @Body() data: BookDTO) {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}

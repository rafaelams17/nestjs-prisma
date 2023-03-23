import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { BookDTO } from './books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // cria um livro
  async create(data: BookDTO) {
    // verificar se o livro já foi criado
    const bookExists = await this.prisma.book.findFirst({
      // procure um livro onde o bar_code é igual ao data.bar_code
      where: {
        bar_code: data.bar_code,
      },
    });

    // se caso o livro exista vai lançar um exceção
    if (bookExists) {
      throw new Error('Book already exists');
    }

    // se o livro não existir ele é salvo no banco

    // await é usado para aguardar a criação do livro
    const book = await this.prisma.book.create({
      data,
    });
    return book;
  }

  // retornar todos os livros disponíveis para a aplicação
  async findAll() {
    return this.prisma.book.findMany();
  }

  // atualizar um livro
  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    // se livro não existir ele deve lançar uma exceção
    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.update({
      data,
      where: {
        id,
      },
    });
  }

  // deletar um livro
  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    // se livro não existir ele deve lançar uma exceção
    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}

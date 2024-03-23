import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>){}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.save(createTodoDto)
  }

  async findAll(): Promise<Todo[]>  {
     return await this.todoRepository.find()
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    //const todo = await this.todoRepository.update(updateTodoDto)
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

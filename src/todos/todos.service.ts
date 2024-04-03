import { Injectable, NotFoundException } from 'node_modules/@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Repository } from 'node_modules/typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepository.save(createTodoDto);
  }

  async findAll(params): Promise<Todo[]> {
    const { page = 1, limit = 10, isCompleted } = params;
    const skip = (page - 1) * limit;
    console.log({ skip, page, isCompleted });
    return await this.todoRepository.find({
      skip,
      take: limit,
      where: { isCompleted },
    });
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoItem = await this.todoRepository.findOne({ where: { id } });
    if (!todoItem) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    // the validation configuration is whitelisted so no unwanted inputs
    const updatedValues = { ...todoItem, ...updateTodoDto };
    return await this.todoRepository.save(updatedValues);
  }

  async remove(id: number) {
    const todoItem = await this.todoRepository.findOne({ where: { id } });
    if (!todoItem) {
      throw new NotFoundException(`Todo with id ${id} is not found`);
    }
    return await this.todoRepository.remove(todoItem);
  }
}

import { Injectable, NotFoundException } from 'node_modules/@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from 'node_modules/@nestjs/typeorm';
import { Repository } from 'node_modules/typeorm';
import { Todo } from './entities/todo.entity';
import { SuccessResponse } from 'src/helpers/success-response/success-response';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.save(createTodoDto);
    return new SuccessResponse({ message: 'Successfully created', data: todo });
  }

  async findAll(params) {
    const { page = 1, limit = 10, isCompleted } = params;
    const skip = (page - 1) * limit;
    console.log({ skip, page, isCompleted });
    const [data, totalCount] = await this.todoRepository.findAndCount({
      skip,
      take: limit,
      where: { isCompleted },
    });
    const pagination = {
      totalCount,
      page,
      perPage: limit,
      totalPages: Math.ceil(totalCount / limit),
    };
    return new SuccessResponse({ data, pagination });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return new SuccessResponse({
      data: todo,
      message: 'Todo item successfully fetched',
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todoItem = await this.todoRepository.findOne({ where: { id } });
    if (!todoItem) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    // the validation configuration is whitelisted so no unwanted inputs
    const updatedValues = { ...todoItem, ...updateTodoDto };

    const savedData = await this.todoRepository.save(updatedValues);
    return new SuccessResponse({ data: savedData });
  }

  async remove(id: number) {
    const todoItem = await this.todoRepository.findOne({ where: { id } });
    if (!todoItem) {
      throw new NotFoundException(`Todo with id ${id} is not found`);
    }
    await this.todoRepository.remove(todoItem);
    return new SuccessResponse({ message: `Removed todo with id: ${id}` });
  }
}

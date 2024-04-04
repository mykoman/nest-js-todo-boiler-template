import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos/entities/todo.entity';
import { LoggerService } from './helpers/logger/logger.service';
import { APP_FILTER } from '@nestjs/core';
import { LoggerFilter } from './helpers/logger/logger.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'michaelogbuma',
      password: '',
      database: 'nestTodo',
      entities: [Todo],
      synchronize: true,
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: LoggerFilter,
    },
    LoggerService,
  ],
})
export class AppModule {}

import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsBoolean()
  isCompleted?: boolean;
}

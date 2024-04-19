import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'title of Todo', example: 'develop website' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ description: 'True or false if completed', example: true })
  @IsBoolean()
  isCompleted?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'title of Todo', example: 'develop website' })
  @Column()
  title: string;

  @ApiProperty({ description: 'True or false if completed', example: true })
  @Column({ default: false })
  isCompleted: boolean;
}

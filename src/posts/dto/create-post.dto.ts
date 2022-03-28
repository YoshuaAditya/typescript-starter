import { IsNotEmpty } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

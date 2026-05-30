import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  coverImage: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  summary: string;

  @IsBoolean()
  @IsOptional()
  isDraft?: boolean;

  @IsArray() // para validar que el campo es un array
  @IsNumber({}, { each: true }) // cada elemento del array debe ser un numero
  @IsNotEmpty()
  categories: number[]; // array de numeros que representan los ids de las categorias
}

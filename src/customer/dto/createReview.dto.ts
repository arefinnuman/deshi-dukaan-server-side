import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  ReviewRating: number;

  @IsNotEmpty()
  ReviewMessage: string;
}

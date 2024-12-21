import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  private reviews = [];

  findAll() {
    return this.reviews;
  }

  findOne(id: string) {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return review;
  }

  create(createReviewDto: CreateReviewDto) {
    const newReview = { id: Date.now().toString(), ...createReviewDto };
    this.reviews.push(newReview);
    return newReview;
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    const reviewIndex = this.reviews.findIndex((r) => r.id === id);
    if (reviewIndex === -1) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    this.reviews[reviewIndex] = { ...this.reviews[reviewIndex], ...updateReviewDto };
    return this.reviews[reviewIndex];
  }

  remove(id: string) {
    const reviewIndex = this.reviews.findIndex((r) => r.id === id);
    if (reviewIndex === -1) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return this.reviews.splice(reviewIndex, 1);
  }
}

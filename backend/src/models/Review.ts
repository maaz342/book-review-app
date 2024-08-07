import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
  user: Schema.Types.ObjectId;
  bookTitle: string;
  author: string;
  reviewText: string;
  rating: number
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookTitle: { type: String, required: true },
  author: { type: String, required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

export const Review = model<IReview>('Review', reviewSchema);

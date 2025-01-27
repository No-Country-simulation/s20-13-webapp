import { Request, Response } from "express";
import { ReviewsService } from "../services/reviews.service";

export class ReviewsController {
  private reviewsService: ReviewsService;

  constructor() {
    this.reviewsService = new ReviewsService();
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getReviewById = this.getReviewById.bind(this);
    this.getReviewsByUserId = this.getReviewsByUserId.bind(this);

    this.createReview = this.createReview.bind(this);
    this.updateReview = this.updateReview.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  public async getAllReviews(req: Request, res: Response): Promise<void> {
    const filters = req.query;

    try {
      const reviews = await this.reviewsService.getAllReviews(filters);
      res.status(200).json(reviews);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async getReviewById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const review = await this.reviewsService.getReviewById(id);
      res.status(200).json(review);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }




  public async getReviewsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const reviews = await this.reviewsService.getReviewsByUserId(userId);
      res.status(200).json(reviews);
    } catch (error: any) {
      console.error("Error al obtener las calificaciones por usuario", error.message);
      res.status(500).json({ message: error.message });
    }
  }



  public async createReview(req: Request, res: Response): Promise<void> {
    const reviewData = req.body;

    try {
      const newReview = await this.reviewsService.createReview(reviewData);
      res.status(201).json("Calificación creada con éxito");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateReview(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = req.body;

    try {
      const updatedReview = await this.reviewsService.updateReview(id, data);
      res.status(200).json("Calificación actualizada correctamente");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteReview(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deletedReview = await this.reviewsService.deleteReview(id);
      res.status(200).json("Calificación eliminada con éxito");
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

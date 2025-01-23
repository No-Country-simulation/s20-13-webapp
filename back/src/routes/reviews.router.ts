import { Router } from "express";
import { ReviewsController } from "../controllers/reviewsController";

const router = Router();
const reviewsController = new ReviewsController();

router.get("/", reviewsController.getAllReviews)
router.get("/:id", reviewsController.getReviewById);
router.get("/user/:userId", reviewsController.getReviewsByUserId);


router.post("/create", reviewsController.createReview);
router.put("/update/:id", reviewsController.updateReview); 
router.delete("/delete/:id", reviewsController.deleteReview); 

export default router;
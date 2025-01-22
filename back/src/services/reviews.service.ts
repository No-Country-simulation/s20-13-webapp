import { Types } from "mongoose";
import { IReviews, Reviews } from "../models/Reviews.model";
import { User } from "../models/Users.model";

export class ReviewsService {
    public async getAllReviews(filter: any): Promise<IReviews[]> {
        try {
            const reviews = await Reviews.find(filter);
            if (reviews.length === 0) {
                throw new Error("No se encontró ninguna calificación");
            }
            return reviews;
        } catch (error) {
            console.error("Error al obtener las calificaciones", error);
            throw new Error("Hubo un error al buscar las calificaciones");
        }
    }

    public async getReviewById(id: string): Promise<IReviews | null> {
        try {
            if (!id) throw new Error("El id de la calificación es requerido");
            if (!Types.ObjectId.isValid(id))
                throw new Error("El id proporcionado de la calificación no es válido");

            const review = await Reviews.findById(id); // <-- Añadido 'await'

            if (!review) {
                console.error("No se encontró ninguna calificación con ese id");
                throw new Error("No se encontró ninguna calificación con ese id");
            }
            return review;
        } catch (error) {
            console.error("Error al obtener la calificación por id", error);
            throw new Error("Hubo un error al buscar la calificación");
        }
    }

    public async getReviewsByUserId(userId: string): Promise<IReviews[]> {
        try {
            if (!userId) throw new Error("El id del usuario es requerido");
            if (!Types.ObjectId.isValid(userId))
                throw new Error("El id proporcionado del usuario no es válido");

            const reviews = await Reviews.find({ user: userId });
            if (reviews.length === 0) {
                throw new Error("No se encontraron calificaciones para este usuario");
            }
            return reviews;
        } catch (error: any) {
            console.error(
                "Error al obtener las calificaciones por usuario",
                error.message
            );
            throw new Error("Hubo un error al buscar las calificaciones por usuario");
        }
    }

    public async createReview(data: any): Promise<IReviews> {
        try {
            if (!data.user) throw new Error("El id del usuario es requerido");
            if (!Types.ObjectId.isValid(data.user))
                throw new Error("El id del usuario proporcionado no es válido");

            const user = await User.findById(data.user);

            if (!user) {
                throw new Error("No se encontró ningun usuario con ese id");
            }

            const newReview = new Reviews(data);
            await newReview.save();
            return newReview;
        } catch (error: any) {
            console.error("Error al crear la calificación", error);

            if (
                error.message === "El id del usuario es requerido" ||
                error.message === "El id del usuario proporcionado no es válido" ||
                error.message === "No se encontró ningun usuario con ese id"
            ) {
                throw new Error(error.message);
            } else {
                throw new Error("Hubo un error al crear la calificación");
            }
        }
    }

    public async updateReview(id: string, data: any): Promise<IReviews | null> {
        try {
            if (!data.user) throw new Error("El id del usuario es requerido");
            if (!Types.ObjectId.isValid(data.user))
                throw new Error("El id del usuario proporcionado no es válido");

            const user = await User.findById(data.user);

            if (!user) {
                throw new Error("No se encontró ningun usuario con ese id");
            }

            if (!id) throw new Error("El id de la calificación es requerido");
            if (!Types.ObjectId.isValid(id))
                throw new Error("El id proporcionado de la calificación no es válido");

            const updatedReview = await Reviews.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });

            if (!updatedReview) {
                console.error("No se encontró ninguna calificación con ese id");
                throw new Error("No se encontró ninguna calificación con ese id");
            }
            return updatedReview;
        } catch (error) {
            console.error("Error al actualizar la calificación", error);
            throw new Error("Hubo un error al actualizar la calificación");
        }
    }

    public async deleteReview(id: string): Promise<IReviews | null> {
        try {
            if (!id) throw new Error("El id de la reseña es requerido");
            if (!Types.ObjectId.isValid(id))
                throw new Error("El id proporcionado de la calificación no es válido");

            const deletedReview = await Reviews.findByIdAndDelete(id);

            if (!deletedReview) {
                console.error("Hubo un error al eliminar la calificación");
                throw new Error("Hubo un error al eliminar la calificación");
            }

            return deletedReview;
        } catch (error) {
            console.error("Error al eliminar una calificación", error);
            throw new Error("Hubo un error al eliminar la calificación");
        }
    }
}

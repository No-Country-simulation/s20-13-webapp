import { Schema, model, Document } from "mongoose";

export interface IAvailability extends Document {
  caretaker: Schema.Types.ObjectId;

  day: string;
  startTime: string;
  endTime: string;

  createdAt: Date;
  updatedAt: Date;
}

enum AvailabilityDay {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

const availabilitySchema = new Schema<IAvailability>(
  {
    startTime: {
      type: String,
      required: [true, "Start Time is required in Data Base Model"],
    },
    endTime: {
      type: String,
      required: [true, "End Time is required in Data Base Model"],
    },
    day: {
      type: String,
      enum: Object.values(AvailabilityDay),
      required: [true, "Day is required in Data Base Model"],
    },

    //relaciones con modelos
    caretaker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Caretaker is required in Data Base Model"],
    },
  },
  {
    //versionado
    timestamps: true,
    versionKey: false,
  }
);

export const Availability = model<IAvailability>(
  "Availability",
  availabilitySchema
);

import { Schema, model, Document } from "mongoose";

export interface ISchedule extends Document {
  owner: Schema.Types.ObjectId;
  caretaker: Schema.Types.ObjectId;

  date: Date;
  status: ScheduleStatus;

  createdAt: Date;
  updatedAt: Date;
}

enum ScheduleStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELED = "canceled",
  FINISHED = "finished",
}

const scheduleSchema = new Schema<ISchedule>(
  {
    date: {
      type: Date,
      required: [true, "Date is required in Data Base Model"],
    },
    status: {
      type: String,
      enum: Object.values(ScheduleStatus),
      default: ScheduleStatus.PENDING, //default en pendiente
    },

    //relaciones con modelos
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required in Data Base Model"],
    },
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

export const Schedule = model<ISchedule>("Schedule", scheduleSchema);

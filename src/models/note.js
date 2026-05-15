import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
      required: true,
    },
  },
  {
    // Автоматично додає поля createdAt та updatedAt
    timestamps: true,
    // Прибирає поле __v, яке додає mongoose за замовчуванням
    versionKey: false,
  },
);

export const Note = model('note', noteSchema);

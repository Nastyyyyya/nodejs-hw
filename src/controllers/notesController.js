import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// Контролер для всіх нотаток (залишаємо)
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found notes!',
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// НОВИЙ контролер для нотатки за ID
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    // Якщо нотатку не знайдено — створюємо помилку 404
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found note with id ${noteId}!`,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    // Створюємо нотатку на основі даних з тіла запиту
    const note = await Note.create(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // Видаляємо та отримуємо видалений об'єкт
    const note = await Note.findByIdAndDelete(noteId);

    // Якщо нотатку не знайдено (результат null) — кидаємо 404
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    // Повертаємо видалену нотатку зі статусом 200
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted the note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // findByIdAndUpdate приймає ID, дані для оновлення та налаштування
    // { new: true } повертає документ ВЖЕ ПІСЛЯ оновлення
    const note = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true, // перевіряє дані згідно зі схемою (наприклад, enum для tag)
    });

    // Якщо нотатку не знайдено — кидаємо 404
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

import { z } from 'zod';

export const createExerciseSchema = z.object({
    name: z.string().min(3),
    muscleGroup: z.string().min(3),
});
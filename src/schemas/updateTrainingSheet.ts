import { z } from 'zod';

export const updateTrainingSheetSchema = z.object({
    studentId: z.number(),
    exercises: z.array(z.object({
        exerciseId: z.number(),
        series: z.number(),
        repetitions: z.number()
    })),
});
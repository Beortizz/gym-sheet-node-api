import { z } from 'zod';

export const updateStudentSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    weight: z.number(),
    height: z.number(),
});
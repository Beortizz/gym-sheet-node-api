import { z } from 'zod';

export const createStudentSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    weight: z.number(),
    height: z.number(),
});
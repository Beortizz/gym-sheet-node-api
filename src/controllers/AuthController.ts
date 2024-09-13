import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
const prisma = new PrismaClient();

export const register = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });
    const token = generateToken(user.id);
    response.json({ user, token });
}

export const login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return response.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    response.json({ user, token });

}
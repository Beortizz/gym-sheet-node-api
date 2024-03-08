import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function getExercises(request: Request, response: Response) {
    prisma.exercise.findMany().then((exercise) => {
        response.json(exercise);
    });
}

export function getExercise(request: Request, response: Response) {
    const id = request.params.id;
    prisma.exercise.findUnique({
        where: {
            id: parseInt(id)
        }
    }).then((exercise) => {
        response.json(exercise);
    });
}

export function createExercise(request: Request, response: Response) {
    const { name, muscleGroup } = request.body;
  
    prisma.exercise.create({
        data: {
            name, 
            muscleGroup,
        }
    }).then((exercise) => {
        response.json(exercise);
    }).catch((error) => {
        console.error("Erro ao criar o exercício:", error);
        response.status(500).json({ error: "Erro ao criar o exercício" });
    });
}

export function updateExercise(request: Request, response: Response) {
    const id = request.params.id;
    const { name, muscleGroup } = request.body;
    prisma.exercise.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            muscleGroup
        }
    }).then((exercise) => {
        response.json(exercise);
    });
}

export function deleteExercise(request: Request, response: Response) {
    const id = request.params.id;
    prisma.exercise.delete({
        where: {
            id: parseInt(id)
        }
    }).then((exercise) => {
        response.json(exercise);
    });
}
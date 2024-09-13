import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface ExerciseInput {
    exerciseId: number;
    series: number;
    repetitions: number;
}


export function getTrainingSheets(request: Request, response: Response) {
    prisma.trainingSheet.findMany({
        include: {
            ExerciseTrainingSheet: {
                select: {
                    series: true,
                    repetitions: true,
                    exercise: true
                }
            }
        }
    })
        .then((trainingSheets) => {
            response.json({ trainingSheets });
        })
        .catch((error) => {
            console.error('Error retrieving training sheets:', error);
            response.status(500).json({ error: 'An error occurred while retrieving training sheets.' });
        });
}


export function getTrainingSheet(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    prisma.trainingSheet.findUnique({
        where: { id },
        include: {
            ExerciseTrainingSheet: {
                select: {
                    series: true,
                    repetitions: true,
                    exercise: true
                }
            }
        }
    })
        .then((trainingSheet) => {
            response.json(trainingSheet);
        })
        .catch((error) => {
            console.error('Error retrieving the training sheet:', error);
            response.status(500).json({ error: 'An error occurred while retrieving the training sheet.' });
        });
}


export function createTrainingSheet(request: Request, response: Response) {
    const { studentId, exercises }: { studentId: number, exercises: ExerciseInput[] } = request.body;

    prisma.trainingSheet.create({
        data: {
            studentId,
            ExerciseTrainingSheet: {
                create: exercises.map((exercise: ExerciseInput) => ({
                    exerciseId: exercise.exerciseId,
                    series: exercise.series,
                    repetitions: exercise.repetitions,
                })),
            },
        },
    })
        .then((trainingSheet) => {
            response.json(trainingSheet);
        })
        .catch((error) => {
            console.error('Error creating the training sheet:', error);
            response.status(500).json({ error: 'An error occurred while creating the training sheet.' });
        });
}

export async function updateTrainingSheet(request: Request, response: Response) {
    const id = parseInt(request.params.id); 
    const { studentId, exercises } = request.body;

    try {
        const trainingSheet = await prisma.trainingSheet.update({
            where: {
                id: id,
            },
            data: {
                studentId: studentId,
            },
        });

        for (const exercise of exercises) {

            const existingEntry = await prisma.exerciseTrainingSheet.findFirst({
                where: {
                    trainingSheetId: id,
                    exerciseId: exercise.exerciseId,
                },
            });

            if (existingEntry) {
                await prisma.exerciseTrainingSheet.update({
                    where: { id: existingEntry.id },
                    data: {
                        series: exercise.series,
                        repetitions: exercise.repetitions,
                    },
                });
            } else {
                await prisma.exerciseTrainingSheet.create({
                    data: {
                        trainingSheetId: id,
                        exerciseId: exercise.exerciseId,
                        series: exercise.series,
                        repetitions: exercise.repetitions,
                    },
                });
            }
        }

    
        await prisma.exerciseTrainingSheet.deleteMany({
            where: {
                trainingSheetId: id,
                exerciseId: { notIn: exercises.map((ex: ExerciseInput) => ex.exerciseId) },
            },
        });

        response.json(trainingSheet);
    } catch (error) {
        console.error('Error updating the training sheet:', error);
        response.status(500).json({ error: 'An error occurred while updating the training sheet.' });
    }
}


export function deleteTrainingSheet(request: Request, response: Response) {
    const id = parseInt(request.params.id);

    prisma.$transaction([
        prisma.exerciseTrainingSheet.deleteMany({
            where: {
                trainingSheetId: id,
            },
        }),
        prisma.trainingSheet.delete({
            where: {
                id: id,
            },
        }),
    ])
        .then(([deletedExerciseSheets, deletedTrainingSheet]) => {
            response.json({
                message: 'Training sheet deleted successfully.',
                trainingSheet: deletedTrainingSheet,
            });
        })
        .catch((error) => {
            console.error('Error deleting the training sheet:', error);
            response.status(500).json({ error: 'An error occurred while deleting the training sheet.' });
        });
}

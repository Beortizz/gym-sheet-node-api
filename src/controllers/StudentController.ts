import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getStudents(request: Request, response: Response) {

    prisma.student.findMany().then((student) => {
        response.json(student);
    });
}

export function getStudent(request: Request, response: Response) {
    const id = request.params.id;
    prisma.student.findUnique({
        where: {
            id: parseInt(id)
        }
    }).then((student) => {
        response.json(student);
    });
}

export function createStudent(request: Request, response: Response) {
    const { name, email, weight, height } = request.body;
  
    prisma.student.create({
        data: {
            name, 
            email, 
            weight, 
            height
        }
    }).then((student) => {
        response.json(student);
    }).catch((error) => {
        console.error("Erro ao criar o estudante:", error);
        response.status(500).json({ error: "Erro ao criar o estudante" });
    });
}


export function updateStudent(request: Request, response: Response) {
    const id = request.params.id;
    const { name, email, weight, height } = request.body;
    prisma.student.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            email,
            weight,
            height
        }
    }).then((student) => {
        response.json(student);
    });
}

export function deleteStudent(request: Request, response: Response) {
    const id = request.params.id;
    prisma.student.delete({
        where: {
            id: parseInt(id)
        }
    }).then((student) => {
        response.json(student);
    });
}

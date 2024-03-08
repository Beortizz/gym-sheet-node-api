-- CreateTable
CREATE TABLE `Exercise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `muscleGroup` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Exercise_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseTrainingSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exerciseId` INTEGER NOT NULL,
    `trainingSheetId` INTEGER NOT NULL,
    `repetitions` INTEGER NOT NULL,
    `series` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExerciseTrainingSheet` ADD CONSTRAINT `ExerciseTrainingSheet_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseTrainingSheet` ADD CONSTRAINT `ExerciseTrainingSheet_trainingSheetId_fkey` FOREIGN KEY (`trainingSheetId`) REFERENCES `TrainingSheet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

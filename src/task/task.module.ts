import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { TaskController } from "./task.controller";

@Module({
    controllers: [TaskController],
    providers: [TaskService],
    imports: [PrismaModule]
})
export class TaskModule{}
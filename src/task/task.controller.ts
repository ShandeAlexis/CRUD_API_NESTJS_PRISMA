import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

@Controller('task')
export class TaskController{
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAllTask() {
        try {
            const tasks = await this.taskService.getAllTask();
            return tasks;
        } catch (error) {
            throw new HttpException('Error fetching tasks', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createTask(@Body() data: Task) {
        try {
            const newTask = await this.taskService.createTask(data);
            return newTask;
        } catch (error) {
            throw new HttpException('Error creating task', HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        try {
            const task = await this.taskService.getTaskById(Number(id));
            if (!task) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            throw new HttpException('Error fetching task', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        try {
            const deletedTask = await this.taskService.deleteTask(Number(id));
            return {
                message: 'Task deleted successfully',
                deletedTask
            };
        } catch (error) {
            throw new HttpException('Error deleting task', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() data: Task) {
        try {
            const updatedTask = await this.taskService.updateTask(Number(id), data);
            return updatedTask;
        } catch (error) {
            throw new HttpException('Error updating task', HttpStatus.BAD_REQUEST);
        }
    }
}

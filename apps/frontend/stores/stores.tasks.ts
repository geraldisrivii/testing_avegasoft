import type { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "@dapp/dto/dto.task";
import { defineStore } from "pinia";

export const useTasks = defineStore("tasks", function () {
  const tasks = ref<TaskDTO[]>([]);

  async function fetchTasks() {
    tasks.value = await apiPrivate<TaskDTO[]>("tasks");
  }

  async function createTask(dto: CreateTaskDTO) {
    const task = await apiPrivate<TaskDTO>("tasks", {
      method: "post",
      body: dto,
    });

    tasks.value.push(task);

    return task;
  }

  async function deleteTask(id: number) {
    const task = await apiPrivate<TaskDTO>(`tasks/${id}`, {
      method: "delete",
    });

    tasks.value = tasks.value.filter((task) => task.id !== id);

    return task;
  }

  async function updateTask(id: number, dto: UpdateTaskDTO) {
    const task = await apiPrivate<TaskDTO>(`tasks/${id}`, {
      method: "put",
      body: dto,
    });

    tasks.value.splice(
      tasks.value.findIndex((t) => t.id === task.id),
      1,
      task
    );
    return task;
  }

  return {
    tasks,
    fetchTasks,
    createTask,
    deleteTask,
    updateTask,
  };
});

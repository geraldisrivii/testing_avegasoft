import { UserDTO } from "./dto.user";

export enum TaskStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface TaskDTO {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  user: UserDTO;
}

export interface CreateTaskDTO extends Omit<TaskDTO, "id" | "status" | "user"> {
  status?: TaskStatus;
}

export interface UpdateTaskDTO extends Partial<Omit<TaskDTO, "id">> {}

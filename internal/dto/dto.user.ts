import { TaskDTO } from "./dto.task";

export interface UserDTO {
  id: number;
  email: string;
  password: string;
  tasks: TaskDTO[]
}

export interface UserWithoutRelation extends Omit<UserDTO, "tasks"> {}

export interface CreateUserDTO extends Omit<UserDTO, "id" | "tasks"> {}

export interface LoginUserDTO extends Omit<UserDTO, "id" | "tasks"> {}

export interface UpdateUserDTO extends Partial<UserDTO> {}

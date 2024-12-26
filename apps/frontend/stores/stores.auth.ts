import type { AuthDTO } from "@dapp/dto/dto.auth";
import type { CreateUserDTO, LoginUserDTO, UserDTO } from "@dapp/dto/dto.user";
import { defineStore } from "pinia";

export const useAuthData = defineStore("user", function () {
  const authData = ref<AuthDTO | null>(null);

  const router = useRouter();

  function saveAuth(data: AuthDTO) {
    localStorage.setItem("auth", JSON.stringify(data));
    authData.value = data;
  }

  function isAuth() {
    return (
      localStorage.getItem("auth") !== null &&
      localStorage.getItem("auth") !== "null"
    );
  }

  async function register(dto: CreateUserDTO) {
    const data = await api<AuthDTO>("auth/register", {
      method: "post",
      body: dto,
    });

    if (data) {
      saveAuth(data);
    }
  }

  async function login(dto: LoginUserDTO) {
    const data = await api<AuthDTO>("auth/login", {
      method: "post",
      body: dto,
    });

    if (data) {
      saveAuth(data);
    }
  }

  function logout() {
    router.push("/account/login");
    localStorage.removeItem("auth");
  }

  return {
    authData,
    saveAuth,
    isAuth,
    register,
    logout,
    login,
  };
});

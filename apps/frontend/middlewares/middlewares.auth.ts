export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const authStore = useAuthData();

  const nuxtApp = useNuxtApp();

  const router = useRouter();

  if (import.meta.client) {
    nuxtApp.hooks.hook("app:mounted", () => {
      if (!authStore.isAuth() && to.path !== "/register") {
        router.push("/account/register");
        return;
      }

      authStore.saveAuth(JSON.parse(localStorage.getItem("auth") as string));
    });
  }

  return;
});

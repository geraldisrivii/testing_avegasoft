import type { AuthDTO } from "@dapp/dto/dto.auth";

export default defineNuxtPlugin((NuxtApp) => {
  const api = $fetch.create({
    baseURL: NuxtApp.$config.public.API_URL,
    async onResponseError({ response }) {
      throw createError({
        statusCode: response.status,
        statusMessage: response._data.message,
      });
    },
  });

  const authStore = useAuthData();

  const api_private = $fetch.create({
    baseURL: NuxtApp.$config.public.API_URL,
    retryStatusCodes: [403],
    retryDelay: 1000,
    retry: 2,
    onRequest({ options }) {
      const token = authStore.authData?.access;
      if (!token) {
        navigateTo("account/login");
      }

      options.headers.set(`Authorization`, `Bearer ${token}`);
    },

    async onResponseError({ response, request, options }) {
      if ([401].includes(response.status)) {
        navigateTo("account/login");
        return;
      }
      if (response.status === 403) {
        const resp = await api_private<AuthDTO>("auth/refresh", {
          method: "post",
          body: {
            refresh: authStore.authData?.refresh,
          },
        });

        options.headers.set(`Authorization`, `Bearer ${resp.access}`);

        authStore.saveAuth(resp);

        return;
      }

      throw createError({
        statusCode: response.status,
        statusMessage: response._data.message,
      });
    },
  });

  return {
    provide: {
      api,
      api_private,
    },
  };
});

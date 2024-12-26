import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}

export function useAPIPrivate<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api_private as typeof $fetch,
  });
}

export async function api<T>(...params: Parameters<typeof $fetch>): Promise<T> {
  const api = useNuxtApp().$api as typeof $fetch;

  return await api<T>(...params);
}

export async function apiPrivate<T>(...params: Parameters<typeof $fetch>) {
  const api_private = useNuxtApp().$api_private as typeof $fetch;

  return await api_private<T>(...params);
}

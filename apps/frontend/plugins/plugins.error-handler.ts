import { H3Error } from "h3";
import { getModalById } from "~/components/modal";
import { WARNING_PLATE } from "~/constants/constants.plates";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (err, ctx, info) => {
    if (!(err instanceof H3Error)) return;

    const modal = getModalById(WARNING_PLATE)!;
    modal.setState(true, {
      message: err.message,
      code: err.statusCode,
    });
  });
});

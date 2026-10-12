import { getOgImage } from "./takumi";
import type { APIRoute } from "astro";

export const GET = (async ({ params, request, locals, currentLocale }) => {
  const { showId } = params;
  return new Response(await getOgImage({ showId, t: locals.t, currentLocale }));
}) satisfies APIRoute;

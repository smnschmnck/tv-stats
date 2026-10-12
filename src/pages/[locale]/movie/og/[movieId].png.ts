import { getOgImage } from "./takumi";
import type { APIRoute } from "astro";

export const GET = (async ({ params, locals, currentLocale }) => {
  const { movieId } = params;
  return new Response(
    await getOgImage({ movieId, t: locals.t, currentLocale }),
  );
}) satisfies APIRoute;

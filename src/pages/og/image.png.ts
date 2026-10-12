import { getOgImage } from "./takumi";

export async function GET() {
  return new Response(await getOgImage());
}

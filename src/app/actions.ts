"use server";

import { redirect } from "next/navigation";

export const searchAction = async (formData: FormData) => {
  const query = formData.get("q") as string;
  if (query?.trim()) {
    redirect(`/search?q=${encodeURIComponent(query.trim())}`);
  }
};

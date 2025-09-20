import { getTranslations } from "next-intl/server";

export const SomethingWentWrong = async () => {
  const t = await getTranslations("common");

  return <p>{t("somethingWentWrong")}</p>;
};

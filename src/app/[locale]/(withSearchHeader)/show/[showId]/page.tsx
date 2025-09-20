import { ShowInfo } from "./components/showInfo";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ showId: string }> }) => {
  const { showId } = await params;

  return <ShowInfo showId={showId} />;
};

export default Page;

const Page = async ({ params }: { params: Promise<{ showId: string }> }) => {
  const { showId } = await params;
  return <div>My Show: {showId}</div>;
};

export default Page;

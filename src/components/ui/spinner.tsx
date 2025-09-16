export const Spinner = () => (
  <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-zinc-500"></div>
);

export const FullScreenSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

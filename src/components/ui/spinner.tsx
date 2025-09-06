export const Spinner = () => (
  <div className="h-6 w-6 rounded-full border-black border-t-zinc-500 border-2 animate-spin"></div>
);

export const FullScreenSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

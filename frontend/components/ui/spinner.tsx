const Spinner = ({ size }: { size: string }) => (
  <div
    className={`w-${size} h-${size} border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
  />
);

export { Spinner };

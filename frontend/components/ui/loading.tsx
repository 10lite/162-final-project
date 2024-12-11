const Loading = ({ size }: { size: string }) => (
  <div className="fixed top-[-20px] left-0 right-0 bottom-0 bg-gray-700 opacity-50 z-10 flex items-center justify-center">
    <div className="w-16 h-16 border-8 border-t-transparent border-white rounded-full animate-spin"></div>
  </div>
);

export { Loading };

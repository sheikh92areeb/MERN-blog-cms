export default function Loading() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 mx-auto"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mb-8 mx-auto"></div>

      <div className="relative h-96 w-full bg-gray-200 rounded-lg mb-8"></div>

      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

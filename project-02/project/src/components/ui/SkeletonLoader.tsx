export default function SkeletonLoader() {
  return (
    <div className="animate-pulse rounded-md bg-gray-200">
      <div className="h-4 w-1/2 rounded bg-gray-300 mb-4"></div>
      <div className="h-4 w-full rounded bg-gray-300 mb-2"></div>
      <div className="h-4 w-5/6 rounded bg-gray-300"></div>
    </div>
  );
}

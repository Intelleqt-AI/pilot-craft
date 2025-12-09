// Shimmer animation component
const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}>
    <div className="w-full h-full bg-gray-200 rounded"></div>
  </div>
);

// Individual skeleton components
const HeaderSkeleton = () => (
  <div className="bg-gray-50 mt-16 py-16 px-5 md:py-20 md:px-36">
    <div className="max-w-4xl mx-auto text-center">
      <Shimmer className="h-8 md:h-12 w-3/4 mx-auto mb-4 rounded" />
      <Shimmer className="h-4 md:h-6 w-1/2 mx-auto rounded" />
    </div>
  </div>
);

const BreadcrumbSkeleton = () => (
  <div className="flex flex-col md:flex-row mb-16 gap-6 md:items-center justify-between">
    <div className="flex items-center gap-2">
      <Shimmer className="h-4 w-12 rounded" />
      <div className="w-4 h-4 bg-gray-200 rounded"></div>
      <Shimmer className="h-4 w-20 rounded" />
    </div>
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4].map(i => (
        <Shimmer key={i} className="w-10 h-10 rounded-full" />
      ))}
    </div>
  </div>
);

const ArticleContentSkeleton = () => (
  <article className="md:text-lg text-base leading-[150%]">
    {/* Title */}
    <Shimmer className="h-10 md:h-12 w-full mb-5 md:mb-8 rounded" />

    {/* Description */}
    <div className="mb-10">
      <Shimmer className="h-4 w-full mb-2 rounded" />
      <Shimmer className="h-4 w-3/4 mb-2 rounded" />
      <Shimmer className="h-4 w-1/2 rounded" />
    </div>

    {/* Cover Image */}
    <figure className="h-[370px] md:h-[630px] py-10 mb-10">
      <Shimmer className="w-full h-full max-h-[630px] rounded-xl" />
    </figure>

    {/* Article Content */}
    <div className="space-y-4 mb-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Shimmer className="h-4 w-full rounded" />
          <Shimmer className="h-4 w-5/6 rounded" />
          <Shimmer className="h-4 w-4/5 rounded" />
        </div>
      ))}
    </div>

    {/* Share Section */}
    <div className="flex pb-8 border-b-[0.5px] border-gray-200 mb-8 items-center flex-col mt-8">
      <Shimmer className="h-6 w-32 mb-4 rounded" />
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4].map(i => (
          <Shimmer key={i} className="w-10 h-10 rounded-full" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(i => (
          <Shimmer key={i} className="h-6 w-16 rounded-xl" />
        ))}
      </div>
    </div>

    {/* Author Section */}
    <div className="flex items-center flex-col">
      <Shimmer className="w-12 h-12 rounded-full mb-4" />
      <Shimmer className="h-4 w-24 mb-1 rounded" />
      <Shimmer className="h-3 w-32 rounded" />
    </div>
  </article>
);

const RelatedPostsSkeleton = () => (
  <section className="py-16 px-5 md:py-[30px] md:px-[64px]">
    <div className="text-center mb-12 md:mb-20">
      <Shimmer className="h-8 w-48 mx-auto mb-4 rounded" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="mb-12 md:mb-15">
          <Shimmer className="w-full h-[290px] rounded-xl mb-6" />
          <Shimmer className="h-6 w-full mb-2 rounded" />
          <Shimmer className="h-6 w-4/5 mb-4 rounded" />
          <Shimmer className="h-4 w-24 rounded" />
        </div>
      ))}
    </div>
  </section>
);

const CTASkeleton = () => (
  <div className="bg-gray-50 py-16 px-5 md:py-20 md:px-16">
    <div className="max-w-4xl mx-auto text-center">
      <Shimmer className="h-8 md:h-10 w-3/4 mx-auto mb-4 rounded" />
      <Shimmer className="h-4 md:h-5 w-1/2 mx-auto mb-8 rounded" />
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Shimmer className="h-12 w-64 rounded" />
        <Shimmer className="h-12 w-48 rounded" />
      </div>
    </div>
  </div>
);

// Main loading component
const BlogPostLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-pulse {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
        }
      `}</style>

      <HeaderSkeleton />

      <section className="py-16 px-5 md:py-[80px] md:px-[144px]">
        <BreadcrumbSkeleton />
        <ArticleContentSkeleton />
      </section>

      <RelatedPostsSkeleton />
      <CTASkeleton />
    </div>
  );
};

export default BlogPostLoadingSkeleton;

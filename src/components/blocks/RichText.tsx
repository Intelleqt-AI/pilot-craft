import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export function RichText({ content }) {
  return (
    <div className="prose prose-xl max-w-full leading-[160%]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-4 mb-3" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-600 underline hover:text-blue-800" {...props} />,
          table: ({ node, ...props }) => <table className="table-auto border-collapse border border-gray-300 my-4 w-full" {...props} />,
          th: ({ node, ...props }) => <th className="border border-gray-300 bg-gray-100 p-2 text-left font-semibold" {...props} />,
          td: ({ node, ...props }) => <td className="border border-gray-300 p-2" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

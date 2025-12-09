import React from 'react';

export function Quote({ quote, author }) {
  return (
    <blockquote className="py-[36px] my-6 px-3 leading-[150%] md:px-8 italic text-[20px] bg-[#F3F1FF] text-secondary">
      <p className={'pl-5 border-l-3 border-secondary'}>
        {quote} {author && <cite className=" font-semibold"> — {author}</cite>}
      </p>
    </blockquote>
  );
}

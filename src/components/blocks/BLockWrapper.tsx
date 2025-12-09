import { BlockRenderer } from '../shared/BlockRenderer';
import React from 'react';

type Block = Record<string, unknown>;
type Props = {
  // Accept either the raw Strapi entry (with attributes) or a flattened article
  article?: unknown;
};

const BLockWrapper: React.FC<Props> = ({ article }) => {
  // Support both shapes: article.blocks (flattened) and article.attributes.blocks (Strapi v4)
  const maybeArticle = article as Record<string, unknown> | undefined;
  const blocks =
    (maybeArticle?.blocks as Block[] | undefined) ||
    ((maybeArticle?.attributes as Record<string, unknown> | undefined)?.blocks as Block[] | undefined) ||
    [];

  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block: Block, index: number) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </>
  );
};

export default BLockWrapper;

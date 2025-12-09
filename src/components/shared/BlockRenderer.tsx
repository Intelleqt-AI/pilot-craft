import React from 'react';
import { RichText } from '../blocks/RichText.tsx';
import { ImageBlock } from '../blocks/ImageBlock';
import { Quote } from '../blocks/Quote';
import { Video } from '../blocks/Video.tsx';
import { CallToAction } from '../blocks/CallToAction';
import { Gallery } from '../blocks/Gallery.tsx';
import { Divider } from '../blocks/Divider';
import { Table } from '../blocks/Table.tsx';
import { Testimonial } from '../blocks/Testimonial.tsx';
import { TwoColumns } from '../blocks/TwoColumns.tsx';

export function BlockRenderer({ block }) {
  if (!block) return null;

  // Check the block type (this depends on your Strapi structure)
  const type = block.__component;

  switch (type) {
    case 'shared.rich-text':
      return <RichText content={block.body} />;

    case 'shared.image':
      return <ImageBlock image={block.image} />;

    case 'shared.quote':
      return <Quote quote={block.body} author={block.author} />;

    case 'shared.video':
      return <Video url={block.url} caption={block.caption} />;

    case 'shared.call-to-action':
      return (
        <CallToAction
          title={block.title}
          text={block.text}
          buttonText={block.buttonText}
          buttonLink={block.buttonLink}
          variant={block.variant}
        />
      );

    case 'shared.gallery':
      return <Gallery images={block.images} />;

    case 'shared.divider':
      return <Divider style={block.style} />;

    case 'shared.table':
      return <Table rows={block.rows} showHeader={block.showHeader} />;

    case 'shared.testimonial':
      return <Testimonial quote={block.quote} author={block.author} role={block.role} avatar={block.avatar} />;

    case 'shared.two-columns':
      return <TwoColumns leftColumn={block.leftColumn} rightColumn={block.rightColumn} ratio={block.ratio} />;

    default:
      console.warn(`Block type "${type}" not supported.`);
      return null;
  }
}

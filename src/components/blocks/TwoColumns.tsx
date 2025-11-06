import React from 'react';
import { BlockRenderer } from '../shared/BlockRenderer';

export function TwoColumns({ leftColumn, rightColumn, ratio = '1:1' }) {
  let leftClass = styles.columnLeft;
  let rightClass = styles.columnRight;

  if (ratio === '1:2') {
    leftClass = `${leftClass} ${styles.columnSmall}`;
    rightClass = `${rightClass} ${styles.columnLarge}`;
  } else if (ratio === '2:1') {
    leftClass = `${leftClass} ${styles.columnLarge}`;
    rightClass = `${rightClass} ${styles.columnSmall}`;
  }

  return (
    <div className={styles.twoColumns}>
      <div className={leftClass}>{leftColumn && leftColumn.map((block, index) => <BlockRenderer key={index} block={block} />)}</div>
      <div className={rightClass}>{rightColumn && rightColumn.map((block, index) => <BlockRenderer key={index} block={block} />)}</div>
    </div>
  );
}

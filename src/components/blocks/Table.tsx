import React from 'react';

export function Table({ rows, showHeader = true }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        {showHeader && (
          <thead>
            <tr>
              {rows[0].map((cell, index) => (
                <th key={index} className={styles.tableHeader}>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.slice(showHeader ? 1 : 0).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.tableCell}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

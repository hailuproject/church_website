export const toCSV = (rows, columns = null) => {
  if (!rows || !rows.length) return '';
  const keys = columns || Object.keys(rows[0]);
  const escape = (value) => {
    if (value === null || value === undefined) return '';
    const str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    return `"${str.replace(/"/g, '""')}"`;
  };
  const header = keys.map(escape).join(',');
  const body = rows.map((row) => keys.map((key) => escape(row[key])).join(','));
  return [header, ...body].join('\n');
};

export const downloadCSV = (res, csv, filename = 'export.csv') => {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csv);
};

export default { toCSV, downloadCSV };

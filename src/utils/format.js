export const formatPrice = (value) => `$${Math.round(Number(value)).toLocaleString("en-US")}`;
export const formatCompact = (value) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
};
export const genId = (prefix = "PRD") => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

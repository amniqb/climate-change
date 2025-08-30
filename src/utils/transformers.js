import { toNumber } from "./format";

/*
 * These transformers convert the API into an array of:
 *   { date: Date, value: number } 
 */

export function transformTemperature(json) {
  const arr = json?.result ?? json?.temperature ?? [];
  return arr
    .map((it) => {
      const yearDec = toNumber(it.time);
      const date = Number.isFinite(yearDec)
        ? decYearToDate(yearDec)
        : new Date(String(it.year || it.date || "1900"));
      const value = toNumber(it.land ?? it.land_ocean ?? it.station);
      return (date && Number.isFinite(value)) ? { date, value } : null;
    })
    .filter(Boolean);
}

export function transformCO2(json) {
  const arr = json?.co2 ?? [];
  return arr
    .map((it) => {
      const y = toNumber(it.year);
      const m = toNumber(it.month) ?? 1;
      const d = toNumber(it.day) ?? 1;
      const date = Number.isFinite(y) ? new Date(y, (m - 1), d) : null;
      const value = toNumber(it.trend ?? it.cycle);
      return (date && Number.isFinite(value)) ? { date, value } : null;
    })
    .filter(Boolean);
}

export function transformMethane(json) {
  const arr = json?.methane ?? json?.ch4 ?? json?.result ?? [];
  return arr
    .map((it) => {
      let date;
      if (it.date) {
        const s = String(it.date);
        date = s.includes("-")
          ? new Date(s + (s.length === 7 ? "-01" : "")) 
          : decMaybeToDate(s);
      } else if (it.year) {
        date = new Date(Number(it.year), (Number(it.month || 1) - 1), Number(it.day || 1));
      }
      const value = toNumber(it.average ?? it.value);
      return (date && Number.isFinite(value)) ? { date, value } : null;
    })
    .filter(Boolean);
}

export function transformNitrous(json) {
  const arr = json?.nitrous ?? json?.n2o ?? json?.result ?? json?.nitrous_oxide ?? [];
  return arr
    .map((it) => {
      let date;
      if (it.date) {
        const s = String(it.date);
        date = s.includes("-") ? new Date(s + (s.length === 7 ? "-01" : "")) : decMaybeToDate(s);
      } else if (it.year) {
        date = new Date(Number(it.year), (Number(it.month || 1) - 1), Number(it.day || 1));
      }
      const value = toNumber(it.average ?? it.value);
      return (date && Number.isFinite(value)) ? { date, value } : null;
    })
    .filter(Boolean);
}



 export function transformArctic(json) {
  if (!json || typeof json !== "object") return [];

  const records = json?.arcticData?.data;
  if (!records || typeof records !== "object") return [];

  const byYear = {};

  Object.entries(records).forEach(([ym, record]) => {
    const year = Number(ym.slice(0, 4));
    const value = Number(record.extent ?? record.area ?? record.value);

    if (!Number.isFinite(value) || value <= -999) return;

    if (!byYear[year]) {
      byYear[year] = { sum: 0, count: 0 };
    }
    byYear[year].sum += value;
    byYear[year].count += 1;
  });

  return Object.entries(byYear).map(([year, { sum, count }]) => {
    return {
      date: new Date(Number(year), 0, 1),
      value: sum / count
    };
  }).sort((a, b) => a.date - b.date);
}




function decYearToDate(dec) {
  const year = Math.floor(dec);
  const rem = dec - year;
  const days = Math.round(rem * 365.25);
  const d = new Date(year, 0, 1);
  d.setDate(d.getDate() + days);
  return d;
}
function decMaybeToDate(s) {
  const n = parseFloat(s);
  return Number.isFinite(n) ? decYearToDate(n) : new Date(s);
}

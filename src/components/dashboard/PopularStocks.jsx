import { MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { POPULAR_STOCKS, FEATURED_STOCK_TREND } from "../../data/dashboardStats";
import "./PopularStocks.css";

const trendData = FEATURED_STOCK_TREND.map((v, i) => ({ i, v }));

export default function PopularStocks() {
  const [featured, ...rest] = POPULAR_STOCKS;

  return (
    <div className="popular-stocks card">
      <div className="popular-stocks__header">
        <h3>Popular Stocks</h3>
        <button className="popular-stocks__more" aria-label="More options"><MoreHorizontal size={18} /></button>
      </div>

      <div className="popular-stocks__featured">
        <div className="popular-stocks__featured-top">
          <div>
            <p className="popular-stocks__featured-name">Bajaj Finery</p>
            <p className="popular-stocks__featured-price">${featured.price.toFixed(2)}</p>
          </div>
          <span className="popular-stocks__profit-tag">{featured.change}% Profit</span>
        </div>
        <ResponsiveContainer width="100%" height={70}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9b8ff" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#c9b8ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#c9b8ff" strokeWidth={2} fill="url(#stockFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <ul className="popular-stocks__list">
        {rest.map((stock, i) => (
          <li key={`${stock.name}-${i}`} className="popular-stocks__row">
            <span className="popular-stocks__row-name">{stock.name}</span>
            <div className="popular-stocks__row-right">
              <span className="popular-stocks__row-price">${stock.price.toFixed(2)}</span>
              <span className={`popular-stocks__row-change popular-stocks__row-change--${stock.direction}`}>
                {stock.direction === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <button className="popular-stocks__view-all">View All &rarr;</button>
    </div>
  );
}

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import "./OrderCard.css";

const SPARKLINE = [
  { v: 20 }, { v: 34 }, { v: 18 }, { v: 40 }, { v: 26 }, { v: 48 }, { v: 30 }, { v: 55 },
];

export default function OrderCard({ value }) {
  const [range, setRange] = useState("Month");
  return (
    <div className="order-card">
      <div className="order-card__top">
        <span className="order-card__icon"><ShoppingBag size={17} /></span>
        <div className="order-card__toggle">
          {["Month", "Year"].map((opt) => (
            <button key={opt} className={range === opt ? "order-card__toggle-btn order-card__toggle-btn--active" : "order-card__toggle-btn"} onClick={() => setRange(opt)}>{opt}</button>
          ))}
        </div>
      </div>
      <p className="order-card__value">${value}</p>
      <p className="order-card__label">Total Order</p>
      <div className="order-card__spark">
        <ResponsiveContainer width="100%" height={46}>
          <AreaChart data={SPARKLINE}>
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8ab4ff" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8ab4ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke="#8ab4ff" strokeWidth={2} fill="url(#sparkFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

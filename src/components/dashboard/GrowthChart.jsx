import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GROWTH_DATA } from "../../data/dashboardStats";
import "./GrowthChart.css";

const SERIES = [
  { key: "investment", label: "Investment", color: "#4fb8e0" },
  { key: "loss", label: "Loss", color: "#8fd3ea" },
  { key: "profit", label: "Profit", color: "#7b5fe0" },
  { key: "maintenance", label: "Maintenance", color: "#5b3fd1" },
];

const RANGES = ["Today", "This Week", "This Month", "This Year"];

export default function GrowthChart() {
  const [range, setRange] = useState("Today");
  const [open, setOpen] = useState(false);
  const total = GROWTH_DATA.reduce((sum, m) => sum + m.investment + m.loss + m.profit + m.maintenance, 0);

  return (
    <div className="growth-chart card">
      <div className="growth-chart__header">
        <div>
          <p className="growth-chart__eyebrow">Total Growth</p>
          <p className="growth-chart__total">${total.toLocaleString()}.00</p>
        </div>
        <div className="growth-chart__range">
          <button className="growth-chart__range-trigger" onClick={() => setOpen((v) => !v)}>{range}<ChevronDown size={14} className={open ? "rotate" : ""} /></button>
          {open && (
            <div className="growth-chart__range-menu">
              {RANGES.map((r) => <button key={r} onClick={() => { setRange(r); setOpen(false); }}>{r}</button>)}
            </div>
          )}
        </div>
      </div>

      <div className="growth-chart__canvas">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={GROWTH_DATA} barSize={16}>
            <CartesianGrid stroke="#2a2e52" vertical={false} />
            <XAxis dataKey="month" stroke="#6b6e93" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="#6b6e93" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip contentStyle={{ background: "#1b1e3a", border: "1px solid #2a2e52", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            {SERIES.map((s) => <Bar key={s.key} dataKey={s.key} stackId="a" name={s.label} fill={s.color} radius={s.key === "maintenance" ? [4, 4, 0, 0] : 0} />)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

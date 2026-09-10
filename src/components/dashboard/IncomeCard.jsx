import { formatCompact } from "../../utils/format";
import "./IncomeCard.css";

// One reusable card, driven entirely by props — used twice on the
// dashboard (a "blue" variant and a "gold" variant) with different data.
export default function IncomeCard({ icon: Icon, value, label, variant = "blue" }) {
  return (
    <div className={`income-card income-card--${variant}`}>
      <span className="income-card__icon"><Icon size={18} /></span>
      <div>
        <p className="income-card__value">{formatCompact(value)}</p>
        <p className="income-card__label">{label}</p>
      </div>
    </div>
  );
}

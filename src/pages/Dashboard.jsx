import { useEffect } from "react";
import { Landmark, Wallet } from "lucide-react";
import { SUMMARY_CARDS } from "../data/dashboardStats";
import EarningCard from "../components/dashboard/EarningCard";
import OrderCard from "../components/dashboard/OrderCard";
import IncomeCard from "../components/dashboard/IncomeCard";
import GrowthChart from "../components/dashboard/GrowthChart";
import PopularStocks from "../components/dashboard/PopularStocks";
import Reveal from "../components/common/Reveal";
import "./Dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | SHOP.CO Admin";
  }, []);

  return (
    <div className="dashboard-page">
      <Reveal as="h1" className="page-heading">Dashboard</Reveal>

      <div className="dashboard-page__grid">
        <Reveal className="dashboard-page__cell dashboard-page__cell--earning">
          <EarningCard value={SUMMARY_CARDS.totalEarning} />
        </Reveal>
        <Reveal delay={60} className="dashboard-page__cell dashboard-page__cell--order">
          <OrderCard value={SUMMARY_CARDS.totalOrder} />
        </Reveal>
        <Reveal delay={120} className="dashboard-page__cell dashboard-page__cell--income">
          <IncomeCard icon={Landmark} value={SUMMARY_CARDS.totalIncome} label="Total Income" variant="blue" />
        </Reveal>
        <Reveal delay={160} className="dashboard-page__cell dashboard-page__cell--income2">
          <IncomeCard icon={Wallet} value={SUMMARY_CARDS.totalIncome} label="Net Profit" variant="gold" />
        </Reveal>
      </div>

      <div className="dashboard-page__lower">
        <Reveal delay={100} className="dashboard-page__growth"><GrowthChart /></Reveal>
        <Reveal delay={160} className="dashboard-page__stocks"><PopularStocks /></Reveal>
      </div>
    </div>
  );
}

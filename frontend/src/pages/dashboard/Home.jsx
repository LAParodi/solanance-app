import { IoMdCard } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";

import InfoCard from "../../components/cards/InfoCard";
import Spinner from "../../components/complements/Spinner";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Last30DaysExpense from "../../components/Dashboard/Last30DaysExpense";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";

import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import { axiosInstance } from "../../utils/axiosInstance";
import { addThousandSeparator } from "../../utils/helper";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  //----- Obtención de transacciones
  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Algo salió mal. Inténtalo de nuevo.", error);
    } finally {
      setLoading(false);
    }
  };

  //----- Renderizado reactivo
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Inicio">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 mx-auto">
          <div className="infoCards__container">
            <InfoCard
              icon={<IoMdCard />}
              label="Balance Total"
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              color="bg-(--text-color-primary)"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Ingreso Total"
              value={addThousandSeparator(dashboardData?.totalIncomes || 0)}
              color="bg-(--text-color-primary)"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Consumo Total"
              value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
              color="bg-(--text-color-primary)"
            />
          </div>

          <div className="recentTransactions__container">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/consumos")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncomes || 0}
              totalExpense={dashboardData?.totalExpenses || 0}
            />

            <ExpenseTransactions
              transactions={
                dashboardData?.lastThirtyDaysExpenses?.transactions || []
              }
              onSeeMore={() => navigate("/consumos")}
            />

            <Last30DaysExpense
              data={dashboardData?.lastThirtyDaysExpenses?.transactions || []}
            />

            <RecentIncomeWithChart
              data={
                dashboardData?.lastSixtyDaysIncomes?.transactions?.slice(
                  0,
                  4
                ) || []
              }
              totalIncome={dashboardData?.totalIncomes || 0}
            />

            <RecentIncome
              transactions={
                dashboardData?.lastSixtyDaysIncomes?.transactions || []
              }
              onSeeMore={() => navigate("/ingresos")}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Home;

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import Spinner from "../../components/complements/Spinner";
import ExpenseList from "../../components/expense/ExpenseList";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";

import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import { axiosInstance } from "../../utils/axiosInstance";

const Expense = () => {
  useUserAuth();

  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //----- Obtención de consumos
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data.expense);
      }
    } catch (error) {
      console.log("Algo salió mal. Inténtalo de nuevo.", error);
    } finally {
      setLoading(false);
    }
  };

  //----- Manejador de consumos
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category.trim()) {
      toast.error("La categoría es requerida");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("La cantidad debe ser un número y debe ser mayor a 0");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Has añadido un nuevo consumo");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Hubo un error al crear nuevo registro:",
        error.response?.data?.message || error.message
      );
    }
  };

  //----- Eliminar consumos
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Registro eliminado");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Hubo un error al eliminar registro:",
        error.response?.data?.message || error.message
      );
    }
  };

  //----- Manejador de descarga de archivos
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "detalles_de_consumos.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Hubo un error al descargar registro:",
        error.response?.data?.message || error.message
      );
    }
  };

  //----- Renderizado reactivo
  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu={"Consumos"}>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <ExpenseOverview
                transactions={expenseData}
                onAddExpense={() => setOpenAddExpenseModal(true)}
              />

              <ExpenseList
                transactions={expenseData}
                onDelete={(id) =>
                  setOpenDeleteAlert({
                    show: true,
                    data: id,
                  })
                }
                onDownload={handleDownloadExpenseDetails}
              />
            </div>
          </div>

          <Modal
            title="Añadir consumo"
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
          >
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </Modal>

          <Modal
            title={"Eliminar registro"}
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          >
            <DeleteAlert
              content="¿Seguro que deseas eliminar este registro?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Expense;

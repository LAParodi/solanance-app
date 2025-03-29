import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import Spinner from "../../components/complements/Spinner";
import IncomeList from "../../components/Income/IncomeList";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeOverview from "../../components/Income/IncomeOverview";
import DashboardLayout from "../../components/layouts/DashboardLayout";

import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import { axiosInstance } from "../../utils/axiosInstance";

const Income = () => {
  useUserAuth();

  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //----- Obtención de Ingresos
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data.income);
      }
    } catch (error) {
      console.log("Algo salió mal. Inténtalo de nuevo.", error);
    } finally {
      setLoading(false);
    }
  };

  //----- Manejador de ingresos
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) {
      toast.error("La procedencia es requerida");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("La cantidad debe ser un número y debe ser mayor a 0");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Has añadido un nuevo ingreso");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Hubo un error al crear nuevo registro:",
        error.response?.data?.message || error.message
      );
    }
  };

  //----- Eliminar ingresos
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Registro eliminado");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Hubo un error al eliminar registro:",
        error.response?.data?.message || error.message
      );
    }
  };

  //----- Manejador de descarga de archivos
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "detalles_de_ingresos.xlsx");
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
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Ingresos">
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModal(true)}
              />

              <IncomeList
                transactions={incomeData}
                onDelete={(id) =>
                  setOpenDeleteAlert({
                    show: true,
                    data: id,
                  })
                }
                onDownload={handleDownloadIncomeDetails}
              />
            </div>
          </div>

          <Modal
            title="Añadir ingreso"
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Modal>

          <Modal
            title={"Eliminar registro"}
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          >
            <DeleteAlert
              content="¿Seguro que deseas eliminar este registro?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Income;

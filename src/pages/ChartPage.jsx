import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearChartData } from "../features/chartSlice";
import { clearAllFormData } from "../features/formSlice";
import { stepChange } from "../features/stepSlice";

const ChartPage = () => {
  const chartData = useSelector((state) => state.chartData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //data on the y-axis
  const series = [
    {
      name: "Value of X",
      data: chartData?.data.X,
    },
  ];
  //data on the x-axis
  const options = {
    chart: { id: "bar-chart" },
    xaxis: {
      categories: chartData?.data.KP,
    },
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleClearEverything = () => {
    localStorage.clear();
    dispatch(stepChange());
    dispatch(clearAllFormData());
    dispatch(clearChartData());
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 gap-5">
      <h1 className="text-black font-bold text-lg">Line Chart</h1>
      <h2 className="text-lg">
        Chart may take a few seconds to load if the dataset is large! Please be
        patient.
      </h2>
      <Chart options={options} series={series} type="line" width="700" />
      <div className="flex flex-row justify-between w-1/2">
        <button className="btn btn-accent" onClick={handleGoBack}>
          Go Back
        </button>
        <button className="btn btn-warning" onClick={handleClearEverything}>
          Clear Everything
        </button>
      </div>
    </div>
  );
};

export default ChartPage;

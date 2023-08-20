import jsPDF from "jspdf";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearChartData } from "../features/chartSlice";
import { clearAllFormData } from "../features/formSlice";
import { stepChange } from "../features/stepSlice";

const ResultPage = () => {
  const SecondFormData = useSelector((state) => state.formData?.secondForm);
  const firstFormData = useSelector((state) => state.formData?.firstForm);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    setLoader(true);
    const capture = document.querySelector(".tabelToDownload");
    let doc = new jsPDF("landscape", "mm", [1000, 900]);

    doc.html(capture, {
      callback: function (doc) {
        doc.save("result.pdf");
        setLoader(false);
      },
      x: 12,
      y: 12,
    });
  };

  // Second table content to render: all the six min max value
  let content = null;
  if (SecondFormData !== null) {
    content = (
      <tbody>
        {/* row  */}
        {SecondFormData?.map((el, i) => (
          <tr className="hover" key={i}>
            <th>{i + 1}</th>
            <td>{i === 0 ? "X" : i === 1 ? "Y" : "Z"}</td>
            <td>{el.max}</td>
            <td>{el.min}</td>
          </tr>
        ))}
      </tbody>
    );
  }

  // First table to render: with the values from step 1
  let firstTableContent = null;
  if (firstFormData !== null || firstFormData !== undefined) {
    firstTableContent = (
      <tr className="hover">
        <th>1</th>
        <td>{firstFormData?.projectName}</td>
        <td>{firstFormData?.projectDetails}</td>
        <td>{firstFormData?.client}</td>
        <td>{firstFormData?.contractor}</td>
      </tr>
    );
  }

  const handleChartClick = () => {
    navigation("/chart");
  };

  
  const handleClearEverything = () => {
    localStorage.clear();
    dispatch(stepChange());
    dispatch(clearAllFormData());

    dispatch(clearChartData());
    navigation("/");
  };

  return (
    <div className="w-2/3 mx-auto">
      <div className=" mx-auto h-fit  mt-10 pt-10 tabelToDownload ">
        <div className="overflow-x-auto w-4/5 mx-auto border border-slate-400 rounded-lg mb-2">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-slate-400  text-black font-extrabold">
                <th></th>
                <th>Project Name</th>
                <th>Project Details</th>
                <th>Client</th>
                <th>Contractor</th>
              </tr>
            </thead>
            <tbody>{firstTableContent}</tbody>
          </table>
        </div>
        <div className=" overflow-x-auto  w-4/5 mx-auto border border-slate-400 rounded-lg">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-slate-400  text-black font-extrabold">
                <th></th>
                <th>Field</th>
                <th>Max</th>
                <th>Min</th>
              </tr>
            </thead>
            {content}
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="btn btn-neutral"
          disabled={loader}
          onClick={downloadPDF}
        >
          {loader ? "Downloading" : "Download"}
        </button>
      </div>
      <div className="flex justify-between mx-14 mt-5">
        <button className="btn btn-accent" onClick={() => navigation(-1)}>
          Go Back
        </button>
        <button
          className="btn btn-success tooltip"
          data-tip="This may take time if the csv file is large!"
          onClick={handleChartClick}
        >
          View Data in Chart
        </button>
        <button className="btn btn-warning" onClick={handleClearEverything}>
          Clear Everything
        </button>
      </div>
    </div>
  );
};

export default ResultPage;

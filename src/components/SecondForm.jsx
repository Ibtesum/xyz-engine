import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearChartData, putChartData } from "../features/chartSlice";
import { clearAllFormData, putSecondFormData } from "../features/formSlice";
import { stepChange } from "../features/stepSlice";
import { calculateMinMax } from "../utils/utils";

const SecondForm = () => {
  const [results, setResults] = useState([]);
  const [resultInObjOfArrayFormat, setResultInObjOfArrayFormat] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [X, setX] = useState({ max: 0, min: 0 });
  const [Y, setY] = useState({ min: 0, max: 0 });
  const [Z, setZ] = useState({ min: 0, max: 0 });

  //  This is to disable all the input fields if user uploads a csv file
  const [disableInputField, setDisableInputField] = useState(false);
  const [startCalculation, setStartCalculation] = useState(false);

  // Using memoization technique for expensive task
  const memoizedExtractedvalue = useMemo(() => {
    const values = {
      KP: [],
      X: [],
      Y: [],
      Z: [],
    };

    if (results?.length > 0) {
      for (let i = 0; i < results.length; i++) {
        values["Z"].push(results[i]?.Z);
        values["KP"].push(results[i]?.KP);
        values["Y"].push(results[i]?.Y);
        values["X"].push(results[i]?.X);
      }
    }
    setResultInObjOfArrayFormat(values);
    return values;
  }, [results]);

  // calculating the min and max value from the X, Y and Z array inside the memoized object
  // Then setting this value to the state of X, Y and Z
  useEffect(() => {
    if (startCalculation && disableInputField) {
      setX(calculateMinMax(memoizedExtractedvalue?.X));
      setY(calculateMinMax(memoizedExtractedvalue?.Y));
      setZ(calculateMinMax(memoizedExtractedvalue?.Z));
    }
  }, [disableInputField, memoizedExtractedvalue, startCalculation]);

  //   File upload handling
  const handleFIleUpload = (e) => {
    e.preventDefault();
    setDisableInputField(true);

    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        let resultArray = results.data;
        setResults(resultArray);
        setStartCalculation(true);
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putSecondFormData([X, Y, Z]));
    dispatch(putChartData(resultInObjOfArrayFormat));
    navigate("/result");
  };

  const handleClearEverything = () => {
    localStorage.clear();
    dispatch(stepChange());
    dispatch(clearAllFormData());

    dispatch(clearChartData());
    navigate("/");
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Input field for file upload */}
        <div className="mb-3 pt-0 flex flex-col gap-1">
          <label
            htmlFor="projectName"
            className="h-full px-3 py-4 text-slate-600 font-bold bg-slate-300  w-full rounded-md"
          >
            Upload File(Only csv file will be accepted)
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFIleUpload}
            className="file-input file-input-bordered file-input-info w-full max-w-xs"
          />
        </div>
        {/* Min Max field for X value */}
        <div className="flex flex-row justify-between gap-2">
          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="max_X"
              className="h-fit px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              max_X
            </label>
            <input
              disabled={disableInputField}
              name="max_X"
              required
              value={startCalculation ? X.max : "" || X.max ? X.max : ""}
              onChange={(e) =>
                setX((prev) => ({ ...prev, max: e.target.value }))
              }
              type="number"
              placeholder="Enter max_X value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>

          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="min_X"
              className="h-full px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              min_X
            </label>
            <input
              disabled={disableInputField}
              name="min_X"
              required
              value={startCalculation ? X.min : "" || X.min ? X.min : ""}
              onChange={(e) =>
                setX((prev) => ({ ...prev, min: e.target.value }))
              }
              type="number"
              placeholder="Enter min_X value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        {/* Min Max field for Y value */}
        <div className="flex flex-row justify-between gap-2">
          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="max_Y"
              className="h-full px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              max_Y
            </label>
            <input
              disabled={disableInputField}
              name="max_Y"
              required
              value={startCalculation ? Y.max : "" || Y.max ? Y.max : ""}
              onChange={(e) =>
                setY((prev) => ({ ...prev, max: e.target.value }))
              }
              type="number"
              placeholder="Enter max_Y value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="min_Y"
              className="h-full px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              min_Y
            </label>
            <input
              disabled={disableInputField}
              name="min_Y"
              required
              value={Y.min || ""}
              onChange={(e) =>
                setY((prev) => ({ ...prev, min: e.target.value }))
              }
              type="number"
              placeholder="Enter min_Y value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        {/* Min Max field for Z value */}
        <div className="flex flex-row justify-between gap-2">
          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="max_Z"
              className="h-full px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              max_Z
            </label>
            <input
              disabled={disableInputField}
              name="max_Z"
              required
              value={startCalculation ? Z.max : "" || Z.max ? Z.max : ""}
              onChange={(e) =>
                setZ((prev) => ({ ...prev, max: e.target.value }))
              }
              type="number"
              placeholder="Enter max_Z value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mb-3 pt-0 flex flex-col gap-1 w-full">
            <label
              htmlFor="min_Z"
              className="h-full px-3 py-2 text-slate-600 font-bold   w-fit rounded-md"
            >
              min_Z
            </label>
            <input
              disabled={disableInputField}
              name="min_Z"
              required
              value={startCalculation ? Z.min : "" || Z.min ? Z.min : ""}
              onChange={(e) =>
                setZ((prev) => ({ ...prev, min: e.target.value }))
              }
              type="number"
              placeholder="Enter min_Z value here"
              className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <button
            type="button"
            onClick={() => dispatch(stepChange())}
            className="btn btn-active btn-ghost hover:btn-neutral w-full md:w-auto"
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleClearEverything}
          >
            Clear Everything
          </button>
          <button
            type="submit"
            className="btn btn-info hover:btn-neutral w-full md:w-auto"
          >
            See Result
          </button>
        </div>
      </form>
    </>
  );
};

export default SecondForm;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putFirstFormData } from "../features/formSlice";
import { stepChange } from "../features/stepSlice";

// eslint-disable-next-line react/prop-types
const FirstForm = ({ step }) => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.formData?.firstForm);

  useEffect(() => {
    if (formData) {
      setInputs(formData);
    }
  }, [formData]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(stepChange());
    dispatch(putFirstFormData({ ...inputs }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-2/3 flex flex-col justify-center mx-auto ">
      <div className="mb-3 pt-0 flex flex-col gap-1">
        <label
          htmlFor="projectName"
          className="h-fit px-3 py-2 text-slate-600 font-bold  w-fit rounded-md"
        >
          Project Name
        </label>
        <input
          disabled={step == 2}
          name="projectName"
          required
          value={inputs?.projectName || ""}
          onChange={handleChange}
          type="text"
          placeholder="Enter project name here"
          className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
        />
      </div>
      <div className="mb-3 pt-0 flex flex-col gap-1 ">
        <label
          htmlFor="projectDetails"
          className="h-fit px-3 py-2 text-slate-600 font-bold w-fit rounded-md"
        >
          Project Details
        </label>

        <textarea
          name="projectDetails"
          required
          disabled={step == 2}
          value={inputs?.projectDetails || ""}
          onChange={handleChange}
          placeholder="Enter your project details here"
          className="placeholder-slate-500 text-slate-800 textarea-bordered textarea-lg w-full  bg-slate-200 border-2 outline-none focus:ring"
        />
      </div>
      <div className="mb-3 pt-0 flex flex-col gap-1 ">
        <label
          htmlFor="client"
          className="h-fit px-3 py-2 text-slate-600  font-bold  w-fit rounded-md"
        >
          Client
        </label>
        <input
          name="client"
          required
          disabled={step == 2}
          value={inputs?.client || ""}
          onChange={handleChange}
          type="text"
          placeholder="Enter client name here"
          className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
        />
      </div>
      <div className="mb-3 pt-0 flex flex-col gap-1 ">
        <label
          htmlFor="contractor"
          className="h-fit px-3 py-2 text-slate-600  font-bold  w-fit rounded-md"
        >
          Contractor
        </label>
        <input
          name="contractor"
          required
          disabled={step == 2}
          value={inputs?.contractor || ""}
          onChange={handleChange}
          type="text"
          placeholder="Enter the contractor name here"
          className="px-3 py-4 placeholder-slate-500 text-slate-800 relative bg-slate-200 rounded text-base border-2 shadow outline-none  focus:outline-none focus:ring w-full"
        />
      </div>
      {step === 1 && (
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-active btn-ghost hover:btn-neutral"
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default FirstForm;

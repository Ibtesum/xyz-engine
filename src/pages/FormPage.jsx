import { useSelector } from "react-redux";
import FirstForm from "../components/FirstForm";
import SecondForm from "../components/SecondForm";

const FormPage = () => {
  const { stepNumber } = useSelector((state) => state.step);
  return (
    <div className=" flex flex-col  justify-between mt-5  gap-5 mx-auto w-3/5  h-full">
      <ul className="steps steps-horizontal">
        <li className="step step-primary">Step 1</li>
        <li className={`step ${stepNumber === 2 && "step-secondary"} `}>
          Step 2
        </li>
      </ul>
      <div className=" flex flex-row justify-between gap-5 ">
        <FirstForm step={stepNumber} />
        {stepNumber === 2 && <SecondForm />}
      </div>
    </div>
  );
};

export default FormPage;

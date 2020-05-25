import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import PaceCalculatorForm from "../../components/paceCalculatorForm";
import SplitsTable from "../../components/splitsTable";

const splits = [
  {
    distance: "200m",
    time: "30 sec"
  },
  {
    distance: "400m",
    time: "60 sec"
  }
];

const initialValues = {
  distance: "1500",
  unit: "1",
  time: "4:00"
};

const onSubmit = (values: any) => console.log(values);

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <PaceCalculatorForm initialValues={initialValues} onSubmit={onSubmit} />
      <SplitsTable splits={splits} />
    </div>
  );
};

export default Home;

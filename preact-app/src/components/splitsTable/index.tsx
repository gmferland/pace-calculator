import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface Split {
  distance: string;
  time: string;
}

interface SplitsTableProps {
  splits: Array<Split>;
}

const SplitsTable: FunctionalComponent<SplitsTableProps> = ({ splits }) => {
  return (
    <section>
      <h2 class={style.title}>Splits</h2>
      <div class={style.splitsTable}>
        {splits.map(({ distance, time }) => (
          <div key={distance} class={style.splitRow}>
            <div class={style.distanceLabel}>{distance}:</div>
            <div>{time}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SplitsTable;

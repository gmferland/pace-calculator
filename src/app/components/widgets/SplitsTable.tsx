import { FunctionalComponent, h } from 'preact';
import { FormattedSplit } from '../../../common/calculation';
import style from './style.css';

interface SplitsTableProps {
  splits: Array<FormattedSplit>;
}

const SplitsTable: FunctionalComponent<SplitsTableProps> = ({ splits }) => {
  return splits && splits.length > 0 ? (
    <section>
      <h2 class={style.title}>Splits</h2>
      <div class={style['splits-table']}>
        {splits.map(({ name, duration }) => (
          <div key={name} class={style['split-row']}>
            <div class={style['distance-label']}>{name}:</div>
            <div>{duration}</div>
          </div>
        ))}
      </div>
    </section>
  ) : null;
};

export default SplitsTable;

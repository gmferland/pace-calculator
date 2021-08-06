import { FunctionalComponent, h } from 'preact';
import style from './style.css';

interface RaceTimeDisplayProps {
  race: string;
  time: string;
  title: string;
}

const RaceTimeDisplay: FunctionalComponent<RaceTimeDisplayProps> = ({
  race,
  time,
  title,
}) => {
  if (!(race && time)) {
    return null;
  }
  return (
    <section>
      <h2 class={style.title}>{title}</h2>
      <div class={style['race-time']}>
        <p>
          <span class={style['finish-time']}>{time}</span>
          {race}
        </p>
      </div>
    </section>
  );
};

export default RaceTimeDisplay;

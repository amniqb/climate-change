import styles from "./Home.module.css";
import colors from "../../styles/colors";


export default function Home(){
  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h1>Global Warming and Climate Change Data Explorer</h1>
        <p>
          This page presents key indicators of our changing climate:
          temperature, greenhouse gases, and Arctic sea ice extent. Use the
          navigation bar above to view the charts. 
        </p>
        <ul className={styles.infoList}>
          <li style={{ "--bullet-color": colors.temperature }}>
             <strong>Temperature:</strong> The current global warming rate is not natural. 
              From 1880 to 1981 it was (0.07°C / 0.13°F) per decade. Since 1981 this rate has 
              increased to (0.18°C / 0.32°F).
          </li>
          <li style={{ "--bullet-color": colors.co2 }}>
            <strong>Carbon Dioxide:</strong> For thousands of years, the natural concentration 
            of CO₂ in Earth's atmosphere was around 280 ppm. Since the industrial revolution, 
            human activities like burning fossil fuels, deforestation, and livestock have 
            increased this by more than 30%.
          </li>
          <li style={{ "--bullet-color": colors.methane }}>
            <strong>Methane:</strong> Methane is a flammable gas formed by geological and 
            biological processes. While natural sources include wetlands and leaks from 
            natural gas systems, 50–65% of methane emissions now come from human activities 
            such as livestock, agriculture, and landfills. Methane is much stronger than CO₂ 
            in terms of warming potential, and its concentration has risen ~150% since the 
            industrial revolution.
           </li>
           <li style={{ "--bullet-color": colors.n2o }}>
            <strong>Nitrous Oxide:</strong> N₂O is produced by fossil fuel combustion, 
            fertilizers, sewage treatment, and other agricultural and industrial activities. 
            It is the third largest heat-trapping gas and the biggest ozone-depleting compound 
            from human activity.
            </li>
            <li style={{ "--bullet-color": colors.arctic }}>
            <strong>Arctic Sea Ice Extent:</strong> The Arctic is warming ~twice as fast as the 
            global average due to effects like Arctic amplification and albedo loss. Ice extent 
            has been shrinking rapidly — from 2–3% loss per decade in 1979–1996 to nearly 13% 
            per decade since 2010. Permafrost thawing also releases more methane, amplifying 
            warming further.
            </li>
            </ul>
      </div>
    </section>
  );
}

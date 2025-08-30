import useFetch from "../../hooks/useFetch";
import { fetchCO2 } from "../../services/api";
import { transformCO2 } from "../../utils/transformers";
import { fmtDateShort } from "../../utils/format";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
import styles from "../ChartPage.module.css";
import colors from "../../styles/colors";
import { Helmet } from "react-helmet";


export default function CO2(){
  const { data, loading, error } = useFetch(fetchCO2, []);
  const series = data ? transformCO2(data) : [];

  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <Helmet>
          <title>CO₂ Concentration Trends</title>
          <meta name="description"
          content="View atmospheric CO₂ concentration at Mauna Loa."
          />
        </Helmet>
        <h1>Atmospheric CO₂</h1>
        <p>Daily global seasonal cycle and trend values at Mauna Loa (ppm). The chart uses the seasonally adjusted trend when present.</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <TimeSeriesChart
          data={series}
          title="CO₂ (ppm, trend)"
          yLabel="ppm"
          xTickFormatter={(d) => fmtDateShort(d)}
          yTickFormatter={(v) => v.toFixed(1)}
          yDomain={[395, "dataMax"]}
          stroke={colors.co2}
        />
      )}
    </section>
  );
}

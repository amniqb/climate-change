import useFetch from "../../hooks/useFetch";
import { fetchTemperature } from "../../services/api";
import { transformTemperature } from "../../utils/transformers";
import { fmtDateShort } from "../../utils/format";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
import styles from "../ChartPage.module.css";
import colors from "../../styles/colors";
import { Helmet } from "react-helmet";

export default function Temperature(){
  const { data, loading, error } = useFetch(fetchTemperature, []);
  const series = data ? transformTemperature(data) : [];

  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <Helmet>
        <title>Global Temperature Anomaly</title>
        <meta
          name="description"
          content="View the global surface temperature anomaly trends over time."
        />
      </Helmet>
        <h1>Global Temperature Anomaly</h1>
        <p>Monthly global mean surface temperature anomaly (°C) relative to a baseline. Values above zero indicate warmer-than-baseline conditions.</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <TimeSeriesChart
          data={series}
          title="Temperature anomaly (°C)"
          yLabel="°C"
          xTickFormatter={(d) => fmtDateShort(d)}
          yTickFormatter={(v) => v.toFixed(2)}
          stroke={colors.temperature}
        />
      )}
    </section>
  );
}

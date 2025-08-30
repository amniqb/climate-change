import useFetch from "../../hooks/useFetch";
import { fetchMethane } from "../../services/api";
import { transformMethane } from "../../utils/transformers";
import { fmtDateShort } from "../../utils/format";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
import styles from "../ChartPage.module.css";
import colors from "../../styles/colors";

export default function Methane(){
  const { data, loading, error } = useFetch(fetchMethane, []);
  const series = data ? transformMethane(data) : [];

  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <h1>Methane (CH₄)</h1>
        <p>Globally averaged, monthly mean methane abundance (ppb).</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <TimeSeriesChart
          data={series}
          title="Methane (ppb)"
          yLabel="ppb"
          xTickFormatter={(d) => fmtDateShort(d)}
          yTickFormatter={(v) => v.toFixed(0)}
          yDomain={[1600, "dataMax"]}
          stroke={colors.methane}
        />
      )}
    </section>
  );
}

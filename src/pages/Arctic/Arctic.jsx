import useFetch from "../../hooks/useFetch";
import { fetchArctic } from "../../services/api";
import { transformArctic } from "../../utils/transformers";
import { fmtDateShort } from "../../utils/format";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
import styles from "../ChartPage.module.css";
import { data } from "react-router-dom";
import colors from "../../styles/colors";


export default function Arctic(){
  const { data, loading, error } = useFetch(fetchArctic, []);
let series = [];
if (data) {
  series = transformArctic(data);
}

  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <h1>Arctic Sea Ice Extent</h1>
        <p>Monthly sea ice extent (million km²) since 1979. Lower values indicate reduced ice cover.</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <TimeSeriesChart
          data={series}
          title="Sea Ice Extent (million km²)"
          yLabel="million km²"
          xTickFormatter={(d) => fmtDateShort(d)}
          yTickFormatter={(v) => v.toFixed(2)}
          yDomain={[19, "dataMax"]}
          stroke={colors.arctic}
        />
      )}
    </section>
  );
}
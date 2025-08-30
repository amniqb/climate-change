import useFetch from "../../hooks/useFetch";
import { fetchNitrous } from "../../services/api";
import { transformNitrous } from "../../utils/transformers";
import { fmtDateShort } from "../../utils/format";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import TimeSeriesChart from "../../components/Chart/TimeSeriesChart";
import styles from "../ChartPage.module.css";
import colors from "../../styles/colors";
import { Helmet } from "react-helmet";

export default function NitrousOxide(){
  const { data, loading, error } = useFetch(fetchNitrous, []);
  const series = data ? transformNitrous(data) : [];

  return (
    <section className={styles.stack}>
      <div className={styles.header}>
        <Helmet>
          <title>Nitrous Oxide Trends</title>
          <meta
          name="description"
          content="View nitrous oxide atmospheric concentration data."
          />
        </Helmet>

        <h1>Nitrous Oxide (N₂O)</h1>
        <p>Globally averaged, monthly mean N₂O abundance (ppb).</p>
      </div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <TimeSeriesChart
          data={series}
          title="Nitrous Oxide (ppb)"
          yLabel="ppb"
          xTickFormatter={(d) => fmtDateShort(d)}
          yTickFormatter={(v) => v.toFixed(1)}
          yDomain={[315, "dataMax"]}
          stroke={colors.n2o}
        />
      )}
    </section>
  );
}

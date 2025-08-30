import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import colors from "../../styles/colors";


const links = [
  { to: "/", label: "Home" },
  { to: "/temperature", label: "Temperature", color: colors.temperature },
  { to: "/co2", label: "CO₂", color: colors.co2 },
  { to: "/methane", label: "Methane", color: colors.methane },
  { to: "/nitrous-oxide", label: "N₂O", color: colors.n2o },
  { to: "/arctic", label: "Arctic", color: colors.arctic },
];

export default function Navbar() {
  return (
    <header className={styles.wrap}>
      <div className={`container ${styles.row}`}>
        <div className={styles.brand}>Climate Dashboard</div>
        <nav className={styles.nav}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              style={({ isActive }) => ({
                "--hover-color": l.color || "inherit",
                color: isActive ? l.color : undefined,
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

import { Redirect } from "react-router";

function Grafana() {
  return <Redirect to={process.env.REACT_APP_GRAFANA_URL} />;
}
export default Grafana;

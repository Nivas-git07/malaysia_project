import Navbar from "../navbar/nav";
import SystemEvents from "../../components/system/systemevent";
export default function SystemLog() {
  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <SystemEvents />
      </div>
    </>
  );
}

import StateList from "../dashboard/state";
import Home from "../dashboard/Home";
import ClubList from "../dashboard/club";
import { useAuth } from "../../../auth/AuthContext";
export default function Authenticate() {
  const { role } = useAuth();
  if (role === "SUPERADMIN") {
    return <Home />;
  } else if (role === "STATE") {
    return <StateList />;
  } else if (role === "CLUB") {
    return <ClubList />;
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2></h2>
      </div>
    );
  }
}

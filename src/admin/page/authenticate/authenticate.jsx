import { checksession } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import StateList from "../dashboard/state";
import { useNavigate } from "react-router-dom";
import Home from "../dashboard/Home";
import ClubList from "../dashboard/club";
export default function Authenticate() {
  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
  } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log("Session Data:", sessionData?.data, sessionLoading, sessionError);
  const role = sessionData?.data.role || "Unknown";
  console.log("User Role:", role);
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

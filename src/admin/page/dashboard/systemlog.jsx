import Navbar from "../navbar/nav";
import SystemEvents from "../../components/system/systemevent";
import { get_logs } from "../../api/record";
import { useQuery } from "@tanstack/react-query";
export default function SystemLog() {
  const { data } = useQuery({
    queryKey: ["get_logs"],
    queryFn: get_logs,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data?.data);

  const datas = data?.data?.results;
  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <SystemEvents data={datas} />
      </div>
    </>
  );
}

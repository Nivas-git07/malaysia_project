import AdminLogin from "./admin/page/login/AdminLogin";
import AdminRoute from "./admin/route/route";
import Page from "./user/route/route";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return(
  <Router>
    {/* <AdminRoute /> */}
    <Page />
  </Router>
  )
}

export default App;

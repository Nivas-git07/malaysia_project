import AdminLogin from "./admin/page/login/AdminLogin";
import Page from "./user/route/route";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return(
  <Router>
    <Page />
    <AdminLogin />
  </Router>
  )
}

export default App;

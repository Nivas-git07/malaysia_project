import AdminLogin from "./admin/page/login/AdminLogin";
import Page from "./user/route/route";
import Sidebar from "./admin/page/dashboard/sidebar";

import { BrowserRouter as Router } from "react-router-dom";
import AdminRoute from "./admin/route/route";

function App() {
  return(
  <Router>
    <Sidebar/>
    <AdminRoute/>
    

    
    {/* <Page />
    <AdminLogin /> */}
  </Router>
  )
}

export default App;

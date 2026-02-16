import Header from "../../../auth/top";
import MemberLogin from "../../../auth/form/loginform";
import Footer from "../../layout/footer";

export default function Login() {
    return (
        <div>
            <Header />
           <MemberLogin/>
            <Footer/>
        </div>
    )
}
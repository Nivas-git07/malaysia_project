import Header from "../../auth/header";
import MemberLogin from "../../auth/form/loginform";
import Footer from "../../components/footer";
export default function Login() {
    return (
        <div>
            <Header />
           <MemberLogin/>
            <Footer/>
        </div>
    )
}
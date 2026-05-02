
import Swimmer from "../layout/swimmer";
export default function Header() {
  return (
    <Swimmer>
      <div className="homeHeroContents">
        <h1 className="homeHeroTitle">MEMBER LOGIN</h1>
        <p className="homeHeroSub">
          Access your account to manage registrations and athlete details.
          <br />
          Sign in to continue your journey.
        </p>
      </div>
    </Swimmer>
  );
}

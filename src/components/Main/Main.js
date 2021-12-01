import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <Promo />
        <AboutProject />
      </main>
    </>
  );
}

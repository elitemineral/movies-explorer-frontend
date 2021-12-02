import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </>
  );
}

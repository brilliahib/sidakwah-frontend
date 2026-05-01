import Footer from "@/components/atoms/footer/Footer";
import HomeAbout from "./HomeAbout";
import HomeFeature from "./HomeFeature";
import HomeHero from "./HomeHero";
import HomeSuperior from "./HomeSuperior";

export default function HomeWrapper() {
  return (
    <main className="overflow-x-hidden">
      <HomeHero />
      <HomeAbout />
      <HomeFeature />
      <HomeSuperior />
      <Footer />
    </main>
  );
}

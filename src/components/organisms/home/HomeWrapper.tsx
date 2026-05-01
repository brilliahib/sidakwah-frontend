import HomeFeature from "./HomeFeature";
import HomeHero from "./HomeHero";

export default function HomeWrapper() {
  return (
    <main className="overflow-x-hidden">
      <HomeHero />
      <HomeFeature />
    </main>
  );
}

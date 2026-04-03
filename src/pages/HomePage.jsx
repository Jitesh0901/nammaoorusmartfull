import { Suspense, lazy } from "react";
import Hero from "../components/Hero.jsx";
import ProductsPage from "./ProductsPage.jsx";

const TrustStats = lazy(() => import("../components/TrustStats.jsx"));
const BrandsStrip = lazy(() => import("../components/BrandsStrip.jsx"));

export default function HomePage({ onNavigate, scrollToProduct }) {
  return (
    <>
      <Hero
        onExplore={() => onNavigate("products")}
        onContact={() => onNavigate("contact")}
      />

      <Suspense fallback={null}>
        <TrustStats />
        <ProductsPage />
        <BrandsStrip />
      </Suspense>
    </>
  );
}

import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Feature from "@/components/Feature";
import FirstBanner from "@/components/FirstBanner";
import JewelryShowcase from "@/components/JewelryShowcase";
import Reviews from "@/components/Reviews";
import SecondBanner from "@/components/SecondBanner";
import TopSeller from "@/components/TopSeller";

export default function Home() {
  return (
    <>
      <FirstBanner />
      <Feature />
      <Reviews />
      <TopSeller />
      <Collections />
      <ProductList />
      <SecondBanner />
      <JewelryShowcase />
    </>
  );
}

export const dynamic = "force-dynamic";

// import Collections from "@/components/Collections";
// import ProductList from "@/components/ProductList";

import Feature from "@/components/Feature";
import FirstBanner from "@/components/FirstBanner";
import JewelryShowcase from "@/components/JewelryShowcase";
import Reviews from "@/components/Reviews";
import SecondBanner from "@/components/SecondBanner";
import TopSeller from "@/components/TopSeller";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <FirstBanner />
      {/* <Image
        src="/banner.png"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
      /> */}
      <Feature />
      <Reviews />
      <TopSeller />
      <SecondBanner />
      {/* <Collections />
      <ProductList /> */}
      <JewelryShowcase />
    </>
  );
}

export const dynamic = "force-dynamic";

import { Hammer, Clock, Gem, type LucideIcon } from "lucide-react";

type InfoCardProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ Icon, title, description }) => (
  <div className="flex-1 flex flex-col items-start text-left p-4">
    <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-black">
      <Icon className="w-8 h-8 text-gray-200" />
    </div>
    <h3 className="text-gray-700 text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-700 text-sm text-justify">{description}</p>
  </div>
);

const SecondBanner: React.FC = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Unicase&display=swap');
        `}
      </style>

      <div className="min-h-screen p-4 flex flex-col md:flex-row gap-4">
        <div className="basis-1/2 flex items-center justify-center order-1 md:order-1">
          <img
            src="../banner2.jpg"
            alt="banner2"
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>

        <div className="flex flex-col md:basis-1/2 gap-6 order-2 md:order-2 justify-center items-start">
          <div
            className="px-6 text-gray-800 text-center md:text-justify"
            style={{ fontFamily: "'Cormorant Unicase', serif" }}
          >
            <h1 className="text-black text-3xl font-normal leading-tight max-w-full">
              Jewelry should do more than decorate.
            </h1>
            <h2 className="text-black text-xl font-normal leading-relaxed max-w-full whitespace-pre-line mt-2">
              It should empower, uplift, and tell a story. That’s why we
              carefully design each piece to reflect authenticity, beauty, and
              confidence. Let our collection become part of your everyday
              elegance.
            </h2>
            <p className="text-black text-lg font-normal leading-relaxed max-w-full whitespace-pre-line mt-4">
              <i>
                “Every piece tells a story of elegance and sophistication. The
                Spanish Latte collection has become an essential part of my
                daily style.”
              </i>
              <br /> — Maria Elena (Fashion Designer)
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-full">
            <InfoCard
              Icon={Hammer}
              title="Skillfully Crafted"
              description="Each piece is expertly crafted with great attention to detail."
            />
            <InfoCard
              Icon={Clock}
              title="Timeless Design"
              description="Our designs merge classic beauty with subtle innovation."
            />
            <InfoCard
              Icon={Gem}
              title="Quality Materials"
              description="Using finest metals and real gemstones for lasting beauty."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondBanner;

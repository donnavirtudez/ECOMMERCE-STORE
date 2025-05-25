const FirstBanner = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@400&display=swap');
        `}
      </style>

      <section className="w-full bg-white text-gray-900">
        <div className="flex flex-col lg:flex-row items-center">
          <div
            className="w-full lg:w-1/2 p-10 sm:p-16 text-center lg:text-left"
            style={{ fontFamily: "'Cormorant Unicase', serif" }}
          >
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-normal leading-snug">
              Every Piece Of Jewelry
              <br className="hidden sm:inline" /> Tells About Your Story
            </h2>
            <p className="text-gray-800 mt-4 text-base sm:text-2xl max-w-md mx-auto lg:mx-0">
              Necklaces, Wedding Rings, And Earrings Are All Available Here.
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src="/banner1.png"
              alt="banner1"
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FirstBanner;

"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const SuccessfulPayment = () => {
  const cart = useCart();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    cart.clearCart();
    setHasMounted(true);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 bg-gradient-to-br from-white to-gray-100 text-gray-900 overflow-hidden">
      {hasMounted && showConfetti && (
        <>
          <div className="absolute top-0 left-0 h-full w-[150px] pointer-events-none z-10">
            <Confetti
              width={150}
              height={height}
              numberOfPieces={200}
              gravity={0.3}
              initialVelocityY={10}
              recycle={false}
              run={showConfetti}
            />
          </div>

          <div className="absolute top-0 right-0 h-full w-[150px] pointer-events-none z-10">
            <Confetti
              width={150}
              height={height}
              numberOfPieces={200}
              gravity={0.3}
              initialVelocityY={10}
              recycle={false}
              run={showConfetti}
            />
          </div>
        </>
      )}

      <div className="z-20 flex flex-col items-center text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          🎉 Payment Successful!
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-md">
          Thank you for your purchase.
          <br />
          We truly appreciate your support!
        </p>
        <Link
          href="/"
          className="mt-2 px-8 py-3 border border-black text-gray-900 font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulPayment;

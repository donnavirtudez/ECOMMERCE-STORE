"use client";

import useCart from "@/lib/hooks/useCart";

import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 px-4 py-6 sm:px-6 md:px-10 min-h-screen bg-white text-gray-800">
      <div className="w-full lg:w-2/3">
        <h1 className="text-xl font-semibold mb-4 text-center lg:text-left">
          Shopping Cart
        </h1>

        <hr className="mb-4 border-gray-200" />

        <div className="space-y-4">
          {cart.cartItems.length === 0 ? (
            <p className="text-center text-gray-500 text-base py-10">
              No item in cart
            </p>
          ) : (
            cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50 rounded-md p-4"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={cartItem.item.media[0]}
                    width={96}
                    height={96}
                    className="rounded-md w-24 h-24 object-cover"
                    alt={cartItem.item.title}
                  />
                  <div className="flex flex-col justify-between text-sm gap-1">
                    <span className="text-gray-900 font-semibold">
                      {cartItem.item.title}
                    </span>
                    {cartItem.color && (
                      <span className="text-gray-500">
                        Color: {cartItem.color}
                      </span>
                    )}
                    {cartItem.size && (
                      <span className="text-gray-500">
                        Size: {cartItem.size}
                      </span>
                    )}
                    <span className="text-gray-700 font-semibold">
                      ₱{cartItem.item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <MinusCircle
                    className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer"
                    onClick={() =>
                      cartItem.quantity > 1 &&
                      cart.decreaseQuantity(cartItem.item._id)
                    }
                  />
                  <span className="text-gray-700 text-sm">
                    {cartItem.quantity}
                  </span>
                  <PlusCircle
                    className="w-5 h-5 text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                  <Trash
                    className="w-5 h-5 text-gray-700 hover:text-red-500 cursor-pointer"
                    onClick={() => cart.removeItem(cartItem.item._id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/3 lg:max-w-sm space-y-4">
        <div className="bg-zinc-50 rounded-md p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Items</span>
            <span>{cart.cartItems.length}</span>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-800 border-t border-gray-200 pt-3">
            <span>Total</span>
            <span>₱{totalRounded}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="cursor-pointer mt-4 w-full bg-black text-white text-sm font-medium py-2.5 rounded hover:bg-zinc-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { format } from "date-fns";

const Orders = async () => {
  const { userId } = await auth();
  let orders = await getOrders(userId as string);

  const hasNoOrders = !orders || orders.length === 0;

  orders = orders?.sort(
    (a: OrderType, b: OrderType) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-6 sm:px-6 md:px-10">
      <h1 className="text-xl font-semibold mb-4 text-center lg:text-left">
        Orders
      </h1>

      <hr className="mb-4 border-gray-200" />

      {hasNoOrders ? (
        <p className="text-center text-gray-500 text-base py-10">
          You have no orders yet
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order: OrderType) => (
            <div key={order._id} className="bg-zinc-50 rounded-md p-4">
              <div className="flex justify-between flex-wrap gap-4 mb-4 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Total:</span> ₱
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Date:</span>{" "}
                  {format(new Date(order.createdAt), "PPP 'at' p")}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {order.products.map(
                  (orderItem: OrderItemType, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50 rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          src={orderItem.product.media[0]}
                          width={96}
                          height={96}
                          className="rounded-md w-24 h-24 object-cover"
                          alt={orderItem.product.title}
                        />
                        <div className="flex flex-col justify-between text-sm gap-1">
                          <p className="text-gray-900 font-semibold">
                            {orderItem.product.title}
                          </p>

                          {orderItem.color && (
                            <p className="text-sm">
                              <span className="font-semibold text-gray-900">
                                Color:
                              </span>{" "}
                              <span className="text-gray-600">
                                {orderItem.color}
                              </span>
                            </p>
                          )}

                          {orderItem.size && (
                            <p className="text-sm">
                              <span className="font-semibold text-gray-900">
                                Size:
                              </span>{" "}
                              <span className="text-gray-600">
                                {orderItem.size}
                              </span>
                            </p>
                          )}

                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">
                              Price:
                            </span>{" "}
                            <span className="text-gray-600">
                              ₱{orderItem.product.price}
                            </span>
                          </p>

                          <p className="text-sm">
                            <span className="font-semibold text-gray-900">
                              Quantity:
                            </span>{" "}
                            <span className="text-gray-600">
                              {orderItem.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";

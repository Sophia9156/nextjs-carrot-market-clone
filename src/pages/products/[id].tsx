import Layout from "@/components/layout";
import Button from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { Product, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import client from "@/libs/server/client";

interface ProductWithUser extends Product {
  user: User;
  isLiked: boolean;
}

interface ChatroomResponse {
  ok: boolean;
  chatroomId: String;
}

interface ItemDetailResponse {
  // ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const router = useRouter();
  const { user } = useUser();
  // const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    toggleFav({});
    if (!data) return;
    boundMutate(
      (prev: any) => prev && { ...prev, isLiked: !prev.isLiked },
      false
    );
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
  };

  const [isModal, setModal] = useState(false);
  const [createChatRoom, { data: chatroomData, loading }] =
    useMutation<ChatroomResponse>(
      `/api/chats?productId=${product.id}&sellerId=${product.userId}`
    );
  const onClickYes = async () => {
    if (loading) return;
    createChatRoom({});
  };

  useEffect(() => {
    if (chatroomData && chatroomData.ok) {
      router.push(`/chats/${chatroomData.chatroomId}`);
    }
  }, [chatroomData, router]);

  if (router.isFallback) {
    return (
      <Layout canGoBack title="상품 상세">
        <span>Loading...</span>
      </Layout>
    );
  }

  return (
    <Layout canGoBack title="상품 상세">
      <div className={isModal ? "h-screen overflow-y-hidden -mt-12" : ""}>
        <div className="px-4 py-4">
          <div className="mb-8">
            {product?.image ? (
              <div className="h-96 bg-slate-300 relative object-contain">
                <Image
                  src={`https://imagedelivery.net/-iJxaZY5qULn22hrA5P1Cg/${product?.image}/public`}
                  alt="product"
                  fill
                />
              </div>
            ) : (
              <div className="h-96 bg-slate-300" />
            )}
            <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
              {product?.user?.avatar ? (
                <Image
                  src={`https://imagedelivery.net/-iJxaZY5qULn22hrA5P1Cg/${product?.user?.avatar}/avatar`}
                  className="w-12 h-12 rounded-full bg-slate-300"
                  alt="profile"
                  width={48}
                  height={48}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-300" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {product?.user?.name}
                </p>
                <Link href={`/users/profiles/${product?.user?.id}`}>
                  <p className="text-xs font-medium text-gray-500">
                    View profile &rarr;
                  </p>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.name}
              </h1>
              <span className="text-2xl block mt-3 text-gray-900">
                ${product?.price}
              </span>
              <p className="my-6 text-gray-700">{product?.description}</p>
              <div className="flex items-center justify-between space-x-2">
                {user?.id !== product.userId ? (
                  <>
                    <Button
                      onClick={() => {
                        setModal(true);
                      }}
                      large
                      text="Talk to seller"
                    />
                    <button
                      onClick={onFavClick}
                      className={cls(
                        "p-3 rounded-md flex items-center justify-center",
                        isLiked
                          ? "text-red-500 hover:bg-gray-100 hover:text-red-600"
                          : " text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      )}
                    >
                      {isLiked ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      )}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    {product.image ? (
                      <div className="h-56 w-full mb-4 bg-slate-300">
                        <Image
                          src={`https://imagedelivery.net/-iJxaZY5qULn22hrA5P1Cg/${product.id}/public`}
                          alt="product"
                          fill
                        />
                      </div>
                    ) : (
                      <div className="h-56 w-full mb-4 bg-slate-300" />
                    )}
                    <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                    <span className="text-xs font-medium text-gray-900">
                      ${product.price}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={cls(
            "w-full h-full bg-gray-600/[0.7] absolute bottom-0 left-0 flex justify-center items-center",
            isModal ? "" : "hidden"
          )}
        >
          <div className="bg-white p-5 rounded-md">
            <p className="py-2">Do you want to talk to seller?</p>
            <div className="flex cursor-pointer py-3 border-t items-center space-x-3">
              {product?.user?.avatar ? (
                <Image
                  src={`https://imagedelivery.net/IGzV4oNIIV0ja6ZhmMk45g/${product.user.avatar}/avatar`}
                  className="w-12 h-12 rounded-full bg-slate-300"
                  width={48}
                  height={48}
                  alt=""
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-300" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {product?.user?.name}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2">
              <Button
                onClick={onClickYes}
                text="Yes"
                className={loading ? "disabled" : ""}
              />
              <Button
                onClick={() => {
                  setModal(false);
                }}
                text="No"
                className={loading ? "disabled" : ""}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }

  const product = await client.product.findUnique({
    where: {
      id: Number(ctx.params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const isLiked = false;
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;

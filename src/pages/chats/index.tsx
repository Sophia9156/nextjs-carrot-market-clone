import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { ChatMessage, Chatroom, User } from "@prisma/client";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface ChatroomWithUsers extends Chatroom {
  buyer: User;
  seller: User;
  chatMessages: ChatMessage[];
}

interface ChatroomResponse {
  ok: boolean;
  chatrooms: ChatroomWithUsers[];
}

const Chats: NextPage = () => {
  const {user} = useUser();
  const {data} = useSWR<ChatroomResponse>('/api/chats');

  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] ">
        {data?.chatrooms?.map((chatroom) => {
          const chatWith = chatroom.buyerId !== user?.id ? {
            name: chatroom?.buyer?.name,
            id: chatroom?.buyer?.id,
            avatarUrl: chatroom?.buyer?.avatar
          } : {
            name: chatroom?.seller?.name,
            id: chatroom?.seller?.id,
            avatarUrl: chatroom?.seller?.avatar,
          }
          return (
            <Link key={chatroom.id} href={`/chats/${chatroom.id}`}>
              <span className="flex px-4 cursor-pointer py-3 items-center space-x-3">
                {chatWith.avatarUrl ? (
                  <Image 
                    src={`https://imagedelivery.net/-iJxaZY5qULn22hrA5P1Cg/${chatWith.avatarUrl}/avatar`}
                    className="w-12 h-12 rounded-full bg-slate-300"
                    alt="profile"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                )}
                <div>
                  <p className="text-gray-700">{chatWith.name}</p>
                  <p className="text-sm  text-gray-500">
                    {Number(chatroom.chatMessages[0].userId) === Number(user?.id) ? '(You said) ' + chatroom.chatMessages[0].message : chatroom.chatMessages[0].message}
                  </p>
                </div>
              </span>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}

export default Chats;

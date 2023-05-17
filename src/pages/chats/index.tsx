import Layout from "@/components/layout";
import Link from "next/link";

export default function Chats() {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="divide-y-[1px] ">
        {[...new Array(7)].map((_, i) => (
          <Link href={`/chats/${i}`} key={i}>
            <span className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">Steve Jebs</p>
                <p className="text-sm  text-gray-500">
                  See you tomorrow in the corner at 2pm!
                </p>
              </div>
            </span>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
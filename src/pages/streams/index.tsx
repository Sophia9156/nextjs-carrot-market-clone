import Link from "next/link";
import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";

export default function Live() {
  return (
    <Layout
      title="라이브"
      hasTabBar>
      <div className="py-10 divide-y-[1px] space-y-4">
        {[...new Array(10)].map((_, i) => (
          <Link
            key={i}
            href={`/streams/${i}`}>
            <span className="pt-4 block  px-4">
              <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                Galaxy S50
              </h1>
            </span>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}

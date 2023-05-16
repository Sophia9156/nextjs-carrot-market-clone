
export default function Live() {
  return (
    <div className="py-10 divide-y-[1px] space-y-4">
      {[...new Array(10)].map((_, i) => (
        <div key={i} className="pt-4 px-4">
          <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
          <h1 className="text-2xl mt-2 font-bold text-gray-900">Galaxy S50</h1>
        </div>
      ))}
      <button className="fixed hover:bg-orange-500 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 text-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="currentColor" 
          className="w-6 h-6"
        >
          <path 
            strokeLinecap="round" 
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" 
          />
        </svg>
      </button>
    </div>
  )
}

export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return <button onClick={onClick} className="px-4 py-4 text-2xl bg-gray-500 hover:bg-yellow-600   text-white font-bold  w-36 h-24 md:w-96  lg:w-96   rounded-lg shadow-[5px_5px_0px_0px_rgba(165,117,80)]">
        {children}
    </button>
}
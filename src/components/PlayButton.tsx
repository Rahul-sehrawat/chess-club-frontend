
export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return <button onClick={onClick} className="px-4 py-4 text-2xl bg-gray-500 hover:bg-yellow-600   text-white font-bold rounded w-96">
        {children}
    </button>
}
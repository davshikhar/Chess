export const Button = ({ onClick, children }: { onClick: () => void, children:React.ReactNode }) => {
    return (
        <div>
            <button onClick={onClick} className="bg-green-500 text-white px-4 py-2 rounded hover:bg:blue-600 cursor-pointer transition duration-300">
                {children}
            </button>
        </div>
    )
}
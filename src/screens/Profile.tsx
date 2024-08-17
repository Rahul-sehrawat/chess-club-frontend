export default function Profile() {
  return (
    <div className="text-white">
      <div className="max-w-[1280px] mx-auto py-2 flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-md font-seibold ">{username}</h2>
          <p className="text-sm my-2">{email}</p>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>

      {/* games section */}
      <div className="flex flex-col bg-slate-800/10 p-3 rounded-md mt-[40px]">
        <h3 className="text-lg font-semibold text-center my-4 ">Your Games</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 p-4 rounded-lg flex flex-col justify-between"
            >
              <h4 className="text-md font-semibold">{game.title}</h4>
              <p className="text-sm">{game.description}</p>
              <p className="text-sm">{game.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Card = (props:any) => {
  return (
    <div className=" w-72 h-3/4 bg-slate-800 rounded overflow-hidden shadow-lg p-6 border border-gray-200">
      <img className="w-full h-48 rounded-lg object-cover" src={props.imgsrc} alt="Card image" />
      <div className="py-4">
        <h2 className="font-bold text-xl mb-2">{props.heading}</h2>
        <p className="text-gray-700 text-base">dfffs</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;

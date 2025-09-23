import InferiorMap from "../assets/inferior-map.svg?react";

function Map() {
    return (
        <div className="p-8 bg-gray-100 min-h-screen flex-1">
            <h2 className="text-2xl font-bold">Térreo</h2>
            <InferiorMap />
        </div>
    );
}

export default Map;
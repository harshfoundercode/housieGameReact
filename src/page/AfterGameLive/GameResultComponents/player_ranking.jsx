import React from 'react'

const PlayerRanking = () => {

    const rankingData = [
        { rank: 1, name: "Player 1", tno: 100, progress: "15/15" },
        { rank: 2, name: "Player 2", tno: 200, progress: "14/15" },
        { rank: 3, name: "Player 3", tno: 300, progress: "13/15" },
        { rank: 4, name: "Player 4", tno: 400, progress: "12/15" },
        { rank: 5, name: "Player 5", tno: 500, progress: "11/15" },
        { rank: 6, name: "Player 6", tno: 600, progress: "10/15" },
        { rank: 7, name: "Player 7", tno: 700, progress: "9/15" },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto mt-8">
            <div className="bg-[#004296]/60 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-2 border-[#FBEFA4]/30">
                <h2 className="text-center text-[#FBEFA4] text-2xl md:text-3xl font-normal mb-4">
                    🏆 Player Ranking
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-4">
                    {rankingData.map((item) => (
                        <div
                            key={item.rank}
                            className="min-w-55 bg-white rounded-xl p-4 text-center shadow border-2 border-[#FBEFA4]"
                        >
                            <p className="font-bold text-[#004296]">Rank-{item.rank}: {item.name}</p>
                            <p className="mt-2 font-bold text-gray-700">Tno: {item.tno}</p>
                            <p className="mt-2 font-bold text-[#004296]">({item.progress})</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlayerRanking

import React from 'react';

function ERDetail({roomsAvailable, roomsUnavailable}) {
    return (
        <div className="bg-gray-800 h-[calc(100vh-84px)] flex flex-col px-5 py-2">

            <div className={"mb-12"}>
                <h1 className="text-2xl text-white mb-10 font-bold">San Francisco Hospital </h1>

                <div className="space-y-4">
                    <div className="text-gray-200">
                        <h1 className={"text-xl"}>Rooms Available: <span className="text-green-500 font-bold">{roomsAvailable}</span></h1>
                    </div>
                    <hr/>
                    <div className="text-gray-200">
                        <h1 className={"text-xl"}>Rooms Hold: <span className="text-yellow-500 font-bold">2</span></h1>
                    </div>
                    <hr/>
                    <div className="text-gray-200">
                        <h1 className={"text-xl"}>Rooms Closed: <span className="text-red-500 font-bold">{roomsUnavailable}</span></h1>
                    </div>
                </div>
            </div>


            <h1 className={"text-white font-bold text-xl mb-2"}>Live Updates:</h1>

            <div className={"text-white overflow-y-scroll"}>

                <div className={" border-white border-2 px-2 py-1"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"font-bold"}>Room 2</h1>

                        <button className={"text-green-500"}>Requested</button>
                    </div>
                    <h1>2023-10-28T14:30:00Z</h1>
                </div>

                <div className={" border-white border-2 px-2 py-1"}>
                    <div className={"flex justify-between"}>
                        <h1 className={"font-bold"}>Room 2</h1>

                        <button className={"text-green-500"}>Requested</button>
                    </div>
                    <h1>2023-10-28T14:30:00Z</h1>
                </div>




            </div>

        </div>
    );
}

export default ERDetail;

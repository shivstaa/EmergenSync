

function Home() {
    return (
        <div className="h-[calc(100vh-84px)] flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="text-center mb-12">
                <h1 className="text-6xl font-extrabold mb-4 animate__animated animate__fadeIn">Welcome to EmergenSync</h1>
                <p className="text-xl font-light">Discover amazing features and enjoy a seamless experience.</p>
            </div>

            <div className="flex space-x-4">
                <button className="py-2 px-6 text-xl font-semibold rounded-lg shadow-md hover:bg-purple-700 hover:text-white focus:outline-none transition transform duration-500 ease-in-out">
                    Get Started
                </button>
                <button className="py-2 px-6 text-xl font-semibold rounded-lg shadow-md bg-white text-purple-500 hover:bg-purple-200 hover:text-purple-700 focus:outline-none transition transform duration-500 ease-in-out">
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default Home;

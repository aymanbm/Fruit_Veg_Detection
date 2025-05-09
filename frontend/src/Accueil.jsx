function Accueil() {
    return (
        <>
            <div className="text-center space-y-8 pt-16">
                {/* Main Title */}
                <h1 className="text-4xl font-bold text-emerald-500 mb-4">
                    Fresh Vision Fruit, Vegetable Detection
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl text-gray-200 font-light">
                    Real-time Quality Analysis for Your Fruits and Vegetables
                </p>

                {/* Call to Action */}
                <div className="mt-12">
                    <a 
                        href="/detection" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg 
                        transition-all duration-300 text-lg font-medium inline-block"
                    >
                        Start Live Detection
                    </a>
                    <a 
                        href="/ImageDetection" 
                        className="ml-[20px] bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg 
                        transition-all duration-300 text-lg font-medium inline-block">
                        Upload Image
                    </a>
                </div>

                {/* Features List */}
                <div className="grid md:grid-cols-3 gap-6 text-gray-300 mt-24 px-4">
                    <div className="p-6 border-2 border-emerald-600 rounded-lg bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-3 text-emerald-400">Instant Analysis</h3>
                        <p className="text-base font-light">Real-time webcam processing with AI-powered insights</p>
                    </div>
                    
                    <div className="p-6 border-2 border-emerald-600 rounded-lg bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-3 text-emerald-400">Quality Assessment</h3>
                        <p className="text-base font-light">Detect freshness levels and potential defects</p>
                    </div>
                    
                    <div className="p-6 border-2 border-emerald-600 rounded-lg bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-semibold mb-3 text-emerald-400">Smart Classification</h3>
                        <p className="text-base font-light">Identify healthy vs. rotten produce with precision</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accueil;
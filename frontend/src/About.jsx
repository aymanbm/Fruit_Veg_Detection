function About() {
    return (
        <div className="min-h-screen p-12 from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-6 backdrop-blur-sm bg-white/5 rounded-2xl p-12 border-2 border-emerald-600">
                    <h1 className="text-5xl font-bold text-emerald-500 mb-4">
                        About Fruitection
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Revolutionizing food quality assessment through AI-powered visual inspection
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Our Mission */}
                    <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                        <h2 className="text-3xl font-semibold text-emerald-400 mb-6">
                            🍎 Our Mission
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            At Fruitection, we're committed to reducing global food waste by providing 
                            instant quality assessment for fresh produce. Our AI-powered solution helps 
                            consumers and businesses make informed decisions about their fruits and 
                            vegetables.
                        </p>
                    </div>

                    {/* How It Works */}
                    <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                        <h2 className="text-3xl font-semibold text-emerald-400 mb-6">
                            🔍 How It Works
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 text-2xl">1</div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-100">Image Capture</h3>
                                    <p className="text-gray-400">Use webcam or upload produce image</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 text-2xl">2</div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-100">AI Analysis</h3>
                                    <p className="text-gray-400">Deep learning model processes visual data</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="text-emerald-400 text-2xl">3</div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-100">Instant Results</h3>
                                    <p className="text-gray-400">Get freshness assessment in seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                    <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
                        🛠️ Technology Stack
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['TensorFlow.js', 'React', 'Python Flask', 'OpenCV'].map((tech, index) => (
                            <div key={index} className="text-center p-4 border border-emerald-600 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="text-emerald-400 text-2xl mb-2">
                                    {['🤖', '⚛️', '🐍', '👁️'][index]}
                                </div>
                                <h3 className="text-gray-100 font-medium">{tech}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                    <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
                        🌱 Our Values
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {title: 'Accuracy', desc: 'State-of-the-art ML models with 95%+ accuracy'},
                            {title: 'Accessibility', desc: 'Free-to-use platform for everyone'},
                            {title: 'Innovation', desc: 'Continuous model improvements'}
                        ].map((value, index) => (
                            <div key={index} className="p-4 border border-emerald-600 rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
import { useState } from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen p-12  from-gray-900 via-gray-800 to-gray-900">
            <Helmet>
                <title>Image Detection</title>
                <meta name="description" content="This is my cool page description." />
                <link rel="stylesheet" href="./ImageDetection.css"/>
            </Helmet>
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-6 backdrop-blur-sm bg-white/5 rounded-2xl p-12 border-2 border-emerald-600">
                    <h1 className="text-5xl font-bold text-emerald-500 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have questions about Fruitection? Want to collaborate? We'd love to hear from you!
                    </p>
                </div>

                {/* Contact Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                        <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
                            <FaPaperPlane className="inline mr-3" />
                            Send us a Message
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-800/50 border border-emerald-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-gray-800/50 border border-emerald-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full bg-gray-800/50 border border-emerald-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-medium flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : (
                                    <>
                                        <FaPaperPlane className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {submitSuccess && (
                                <div className="mt-4 p-3 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500 flex items-center">
                                    <span className="animate-bounce">🎉</span>
                                    <span className="ml-2">Message sent successfully!</span>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        {/* Info Cards */}
                        <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                            <h2 className="text-3xl font-semibold text-emerald-400 mb-8">
                                <FaMapMarkerAlt className="inline mr-3" />
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-emerald-400 text-2xl mt-1">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-100">Headquarters</h3>
                                        <p className="text-gray-400">
                                            123 Tech Valley Road<br/>
                                            Silicon Oasis, Casablanca<br/>
                                            Morocco
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="text-emerald-400 text-2xl mt-1">
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-100">Phone</h3>
                                        <p className="text-gray-400">
                                            +212 6 44 15 72 01<br/>
                                            Mon-Fri, 9h - 18h GMT
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="text-emerald-400 text-2xl mt-1">
                                        <FaPaperPlane />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-100">Email</h3>
                                        <p className="text-gray-400">
                                            support@fruitection.ai<br/>
                                            partnerships@fruitection.ai
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="backdrop-blur-sm bg-white/5 p-8 rounded-xl border-2 border-emerald-600">
                            <h2 className="text-3xl font-semibold text-emerald-400 mb-6">
                                Follow Us
                            </h2>
                            <div className="flex space-x-6 justify-center">
                                {[
                                    {icon: <FaGithub />, label: 'GitHub'},
                                    {icon: <FaTwitter />, label: 'Twitter'},
                                    {icon: <FaLinkedin />, label: 'LinkedIn'}
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="text-3xl text-gray-400 hover:text-emerald-500 transition-colors duration-300"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-sm bg-white/5 rounded-xl border-2 border-emerald-600 overflow-hidden">
                    <iframe
                        title="Office Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13299.06395134376!2d-7.6363349!3d33.5594559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d349abcd0d1%3A0xe46f74df88502b51!2sL&#39;Oasis%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1746133004965!5m2!1sfr!2sma"
                        className="w-full h-64"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact;

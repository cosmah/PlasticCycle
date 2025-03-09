import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PlasticCycle - Smart Plastic Waste Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Comprehensive plastic waste management platform connecting households, businesses, collectors and recycling centers" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="w-full max-w-7xl mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
                                <path d="M5 16l-2 6h18l-2-6" />
                                <path d="M16.5 2A3.5 3.5 0 0 0 13 5.5V16h8.5A3.5 3.5 0 0 0 25 12.5V9a3 3 0 0 0-3-3h-2.3L16.5 2Z" stroke="none" fill="currentColor" />
                                <path d="M3.22 11.8c-.3.38-.44.76-.44 1.2a3.5 3.5 0 0 0 7 0v-7.5A3.5 3.5 0 0 1 13 2c.57 0 1.13.14 1.66.42" />
                                <path d="m3 15 8-3" />
                                <path d="M13 5.5v4.5" />
                            </svg>
                            <span className="text-xl font-semibold">PlasticCycle</span>
                        </div>
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] transition-colors"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="flex flex-col items-center w-full max-w-7xl mt-8 lg:mt-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4 lg:text-5xl">Connecting the Plastic Recycling Ecosystem</h1>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto dark:text-gray-300">
                            PlasticCycle brings together households, businesses, waste collectors, and recycling centers in one integrated platform to streamline plastic waste management.
                        </p>
                        <Link
                            href={route('register')}
                            className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 text-md font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                            Get Started Now
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 w-full mt-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Secure Multi-Role Access</h2>
                            <p className="text-gray-600 dark:text-gray-400">Different accounts for households, businesses, recyclers, and administrators with role-specific permissions and dashboards.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 dark:bg-green-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600">
                                    <path d="M8 7V3m8 4V3" />
                                    <path d="M3 21h18" />
                                    <path d="M3 10h18" />
                                    <path d="M3 7h18" />
                                    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                                    <path d="m9 16 2 2 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Waste Collection Scheduling</h2>
                            <p className="text-gray-600 dark:text-gray-400">Schedule pickups, specify plastic types and quantities, receive real-time collection status updates and notifications.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 dark:bg-purple-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-purple-600">
                                    <path d="M12 2v8" />
                                    <path d="m16 6-4 4-4-4" />
                                    <rect width="20" height="8" x="2" y="14" rx="2" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Track & Report</h2>
                            <p className="text-gray-600 dark:text-gray-400">Comprehensive tracking of collected, recycled, and disposed plastic waste with data visualizations and trend analysis.</p>
                        </div>
                    </div>

                    {/* Additional Features Section */}
                    <div className="flex flex-col md:flex-row gap-8 w-full mt-8">
                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 dark:bg-amber-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-600">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Recycling Center Matching</h2>
                            <p className="text-gray-600 dark:text-gray-400">Match collected plastic waste with appropriate recycling centers based on plastic type and location requirements.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 dark:bg-red-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-red-600">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                    <path d="M4 22h16" />
                                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Incentives & Rewards</h2>
                            <p className="text-gray-600 dark:text-gray-400">Earn points for recycling that can be redeemed for discounts or cash rewards. Track your impact and earnings.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 dark:bg-teal-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-teal-600">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold mb-2">Location Services</h2>
                            <p className="text-gray-600 dark:text-gray-400">GPS-enabled navigation for collectors, nearby recycling centers, and optimized collection routes to reduce costs.</p>
                        </div>
                    </div>

                    {/* Enhanced Stakeholder Section with Visual */}
                    <div className="mt-16 w-full flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">For Every Stakeholder</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 dark:bg-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Households</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Schedule plastic waste pickups, track your recycling impact, and earn rewards for your efforts.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 dark:bg-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                            <path d="M4 22h16" />
                                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Businesses</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Manage commercial plastic waste efficiently, generate compliance reports, and improve sustainability metrics.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 dark:bg-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                            <path d="M14.5 7.5h-5" />
                                            <path d="M12 6v3" />
                                            <path d="m14.5 16.5-5-5" />
                                            <path d="m9.5 16.5 5-5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Waste Collectors</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Receive collection requests, optimize routes, and coordinate with recycling centers for efficient handovers.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 dark:bg-blue-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-600">
                                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 1 1 1.5 1.5 1.5 3 0 1.93-1.57 3.5-3.5 3.5-1.5 0-2.5-.5-3-1.5-.5 1-1.5 2-3 2s-2.5-1.5-2.5-3C5.5 10.46 7 8.56 9 7.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Recycling Centers</h3>
                                        <p className="text-gray-600 dark:text-gray-400">List plastic requirements, receive matched waste batches, and track processing metrics and environmental impact.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="w-full max-w-md aspect-square bg-blue-50 rounded-lg flex items-center justify-center dark:bg-blue-900/30 overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/400x400?text=Dashboard+Preview"
                                    alt="Dashboard Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="w-full mt-16 bg-blue-50 p-8 rounded-lg dark:bg-blue-900/30">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold">Join the Plastic Recycling Network</h2>
                            <p className="text-lg text-gray-600 mt-2 dark:text-gray-400">Connect with collectors, recycling centers, and eco-conscious businesses and communities.</p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="inline-block rounded-md bg-blue-600 px-6 py-3 text-md font-medium text-white hover:bg-blue-700 transition-colors text-center"
                            >
                                Register as a Household
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-md bg-teal-600 px-6 py-3 text-md font-medium text-white hover:bg-teal-700 transition-colors text-center"
                            >
                                Register as a Business
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-md bg-purple-600 px-6 py-3 text-md font-medium text-white hover:bg-purple-700 transition-colors text-center"
                            >
                                Join as a Collector/Recycler
                            </Link>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                    <line x1="4" x2="4" y1="22" y2="15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-400">Comprehensive data visualization dashboard showing collection trends, recycling rates, and environmental impact metrics.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Real-time Notifications</h3>
                            <p className="text-gray-600 dark:text-gray-400">Stay informed with alerts about collection status, recycling center needs, and community cleanup events.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">IoT Integration</h3>
                            <p className="text-gray-600 dark:text-gray-400">Connect with smart bins and other IoT devices for real-time monitoring of waste levels and automated collection triggers.</p>
                        </div>
                    </div>
                </main>

                <footer className="w-full max-w-7xl mt-16 pt-8 pb-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600">
                                    <path d="M5 16l-2 6h18l-2-6" />
                                    <path d="M16.5 2A3.5 3.5 0 0 0 13 5.5V16h8.5A3.5 3.5 0 0 0 25 12.5V9a3 3 0 0 0-3-3h-2.3L16.5 2Z" stroke="none" fill="currentColor" />
                                    <path d="M3.22 11.8c-.3.38-.44.76-.44 1.2a3.5 3.5 0 0 0 7 0v-7.5A3.5 3.5 0 0 1 13 2c.57 0 1.13.14 1.66.42" />
                                    <path d="m3 15 8-3" />
                                    <path d="M13 5.5v4.5" />
                                </svg>
                                <span className="font-semibold">PlasticCycle</span>
                            </div>
                            <p className="text-gray-600 text-sm dark:text-gray-400">Connecting households, businesses, collectors, and recycling centers to create a more efficient plastic waste management ecosystem.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-semibold mb-3">Platform</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mobile App</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">API Access</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Integrations</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Company</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Partners</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Impact Report</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3">Resources</h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <p>&copy; {new Date().getFullYear()} PlasticCycle. All rights reserved.</p>
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Facebook</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
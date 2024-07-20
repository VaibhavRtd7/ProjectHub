import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <footer className="w-full bg-neutral-100 dark:bg-neutral-900/30 mt-5" aria-labelledby="footer-heading">
                <h2 id="footer-heading" className="sr-only">Footer</h2>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-16">
                    <div className="flex flex-col items-baseline space-y-6">
                        <div className="mx-auto">
                            <Link to="/" className="mx-auto flex items-center text-lg text-center  gap-2 transition duration-500 ease-in-out transform tracking-relaxed">
                                <img src="/icon2.png" className="w-10 aspect-square " alt="Dev critique" /> ProjectHub
                            </Link>
                        </div>
                        <div className="mx-auto">
                            <span className="mx-auto mt-2 text-sm text-gray-500">
                                Copyright © 2023 - 2024
                                <Link to="/" className="mx-2 text-blue-500 hover:text-gray-500" rel="noopener noreferrer">@ProjectHub</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

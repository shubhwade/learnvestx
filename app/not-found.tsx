import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="text-8xl font-bold text-white/20 mb-4">404</div>
                <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
                <p className="text-white/50 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link href="/">
                    <button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
export default function Hero() {
    return (
      <div className="text-center bg-gray-50 py-20 px-6">
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-6">Welcome to the IT Asset Management Hub</h1>
        <p className="text-lg text-gray-600 mb-8">
          Take control of your IT assets with precision and ease.
        </p>
        <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your IT Assets?</h2>
        <p className="mb-8">Log in and gain access towards a more organized and efficient asset management workflow.</p>
        <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-purple-700">Log In</Link>
      </div>
    );
  }
  
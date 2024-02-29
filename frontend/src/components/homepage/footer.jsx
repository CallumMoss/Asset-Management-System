export default function Footer() {
  return (
      <footer id="contact" className="bg-purple-600 text-white text-center p-4">
          <div className="container mx-auto px-6">
              <p>&copy; {new Date().getFullYear()} IT Asset Management Hub. All rights reserved.</p>
          </div>
      </footer>
  );
}

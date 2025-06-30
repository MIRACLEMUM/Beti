// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-sm py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} Beti. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
}

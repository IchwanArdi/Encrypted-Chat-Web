import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

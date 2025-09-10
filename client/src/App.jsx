import Index from './pages';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 flex flex-col">
        <Navbar />
        <Index />
      </div>
    </>
  );
}

export default App;

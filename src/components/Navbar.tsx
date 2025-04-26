import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, LogOut } from 'lucide-react'; // Added LogOut import
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js'; // Import the User type from Supabase

export default function Navbar() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [user, setUser] = React.useState<SupabaseUser | null>(null); // Explicitly set the user type
  const navigate = useNavigate(); // React Router's navigate hook

  React.useEffect(() => {
    // Get the current session on mount using getSession()
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Current session:', session);
      setUser(session?.user ?? null);
    });

    // Subscribe to authentication state changes
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
    });

  }, []);

  // Handle logout functionality
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Set user state to null after logout
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* Search Icon */}
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {/* Cart Icon */}
            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500">
              <ShoppingCart className="h-6 w-6 text-black" />
            </Link>

            {/* User Icon or Login */}
            {user ? (
              <>
                <Link to="/profile" className="p-2 text-gray-400 hover:text-gray-500">
                  <User className="h-6 w-6 text-black" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="h-6 w-6 text-black" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

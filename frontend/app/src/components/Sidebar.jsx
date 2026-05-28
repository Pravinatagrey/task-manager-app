import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div 
      className={`min-h-screen bg-slate-900 text-slate-400 flex flex-col justify-between border-r border-slate-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Block */}
      <div>
        <div className="p-4 flex items-center justify-between border-b border-slate-800 h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-bold text-white tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black">
                T
              </div>
              <span>TaskApp</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold transition-all group relative ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={22} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400 transition'} />
                
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                
                {/* Tooltip text when navigation sidebar is collapsed */}
                {isCollapsed && (
                  <span className="absolute left-24 scale-0 group-hover:scale-100 transition-all rounded-md bg-slate-950 p-2 text-xs text-white whitespace-nowrap shadow-md z-50">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Footer Section */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition group relative ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={22} />
          {!isCollapsed && <span>Logout</span>}
          
          {isCollapsed && (
            <span className="absolute left-24 scale-0 group-hover:scale-100 transition-all rounded-md bg-rose-950 p-2 text-xs text-rose-300 whitespace-nowrap shadow-md z-50">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
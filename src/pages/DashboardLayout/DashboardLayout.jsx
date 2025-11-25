import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import Sidebar from '../SideBar/SideBar';
export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);


    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}

                <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={toggleSidebar}
                        className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900">Welcome!</h1>
                    
                </div>
                <main className="flex-1 overflow-auto p-6">
                    {/* All Content Display Hear */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

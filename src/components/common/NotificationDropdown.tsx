import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, AlertTriangle, Shield, CheckCircle2, Siren } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const NotificationDropdown: React.FC = () => {
  const { notifications, markNotificationAsRead, currentRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter notifications relevant to current role or 'all'
  const filteredNotifications = notifications.filter(
    n => n.roleTarget === currentRole || n.roleTarget === 'all'
  );

  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <Siren className="w-4 h-4 text-rose-600" />;
      case 'welfare':
        return <Shield className="w-4 h-4 text-coop-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-surface-600 hover:text-surface-900 hover:bg-surface-100 rounded-xl transition-all"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-surface-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2 border-b border-surface-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-surface-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-coop-100 text-coop-800 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <span className="text-[11px] text-surface-400 font-medium capitalize">
              Role: {currentRole}
            </span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-surface-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-surface-400">
                No notifications for this role.
              </div>
            ) : (
              filteredNotifications.map(item => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-3.5 hover:bg-surface-50 transition-colors flex items-start gap-3 cursor-pointer ${
                    !item.read ? 'bg-coop-50/40' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-surface-200 shadow-xs shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-surface-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-surface-400 shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-surface-600 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    {item.actionUrl && (
                      <Link
                        to={item.actionUrl}
                        onClick={() => setIsOpen(false)}
                        className="inline-block mt-1.5 text-[11px] font-bold text-coop-700 hover:text-coop-800 hover:underline"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-coop-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t border-surface-100 text-center">
            <button
              onClick={() => {
                filteredNotifications.forEach(n => markNotificationAsRead(n.id));
              }}
              className="text-xs font-semibold text-surface-500 hover:text-coop-700 flex items-center justify-center gap-1 w-full py-1"
            >
              <Check className="w-3.5 h-3.5" />
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

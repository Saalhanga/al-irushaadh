import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Menu, LogOut, Home, Users, FileText, Inbox, CheckSquare, FolderOpen, Tag, Calendar, Star, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin', label: 'admin.dashboard', icon: Home, end: true },
  { to: '/admin/sheikhs', label: 'admin.sheikhs', icon: Users },
  { to: '/admin/content', label: 'admin.contentManagement', icon: FileText },
  { to: '/admin/submissions', label: 'admin.submissions', icon: Inbox },
  { to: '/admin/review-center', label: 'admin.reviewCenter', icon: CheckSquare },
  { to: '/admin/collections', label: 'admin.collections', icon: FolderOpen },
  { to: '/admin/topics', label: 'admin.topics', icon: Tag },
  { to: '/admin/events', label: 'admin.events', icon: Calendar },
  { to: '/admin/featured', label: 'admin.featured', icon: Star },
  { to: '/admin/analytics', label: 'admin.analytics', icon: BarChart3 },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-foreground">AL IRUSHAADH</h2>
        <p className="text-xs text-muted-foreground">Admin Panel</p>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              )
            }
            onClick={() => setMobileOpen(false)}
          >
            <item.icon size={18} />
            {t(item.label)}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 border-r bg-card flex-col">
        <Sidebar />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <main className="flex-1">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

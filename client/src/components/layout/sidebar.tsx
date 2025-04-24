import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { sidebarNavigation } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  ChevronDown,
  Home,
  Users,
  ShoppingCart,
  FileText,
  Layers,
  Settings,
  X
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const { isOpen, close } = useSidebar();
  
  // Mock user data for demo
  const mockUser = {
    username: "admin",
    fullName: "Admin User",
    role: "Administrator",
    avatar: ""
  };

  // Track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Dashboard: true, // Dashboard section open by default
  });

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard': return <Home className="sidebar-icon" />;
      case 'user': return <Users className="sidebar-icon" />;
      case 'shopping-cart': return <ShoppingCart className="sidebar-icon" />;
      case 'file-list': return <FileText className="sidebar-icon" />;
      case 'pages': return <Layers className="sidebar-icon" />;
      case 'settings': return <Settings className="sidebar-icon" />;
      default: return <Home className="sidebar-icon" />;
    }
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 z-20 flex flex-col flex-shrink-0 w-64 transition-all duration-300 transform bg-sidebar border-r border-sidebar-border shadow-sm lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0",
        className
      )}
    >
      <div className="flex items-center justify-between flex-shrink-0 p-4">
        <div className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Home className="text-primary-foreground h-4 w-4" />
          </span>
          <span className="text-xl font-semibold text-sidebar-foreground">Looper Admin</span>
        </div>
        <button 
          onClick={close} 
          className="p-1 rounded-md lg:hidden text-sidebar-foreground focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {sidebarNavigation.map((item) => (
            <li key={item.name} className="mt-1">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.name)}
                    className="flex items-center w-full p-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
                  >
                    {getIcon(item.icon)}
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform duration-200",
                        openSections[item.name] ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {openSections[item.name] && (
                    <ul className="pl-7 mt-1 space-y-1">
                      {item.subItems.map((subItem) => {
                        const isActive = location === subItem.path;
                        return (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.path}
                              className={cn(
                                "block p-2 rounded-lg",
                                isActive
                                  ? "text-sidebar-primary font-medium bg-sidebar-accent"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                              )}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path || "/"}
                  className={cn(
                    "flex items-center p-3 rounded-lg",
                    location === item.path
                      ? "text-sidebar-primary bg-sidebar-accent"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={mockUser.avatar || ""} alt={mockUser.fullName || "User"} />
            <AvatarFallback>{mockUser.fullName?.charAt(0) || mockUser.username?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">
              {mockUser.fullName || mockUser.username || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {mockUser.role || "User"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

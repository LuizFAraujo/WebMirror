import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/hooks/use-theme";
import { useSidebar } from "@/hooks/use-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { notificationData } from "@/lib/data";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Menu,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { toggle } = useSidebar();
  const { user, logoutMutation } = useAuth();
  
  // For notification dropdown
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getIconForNotification = (iconName: string) => {
    switch (iconName) {
      case 'user-add': return (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
          <User className="h-5 w-5 text-primary-600 dark:text-primary-300" />
        </span>
      );
      case 'shopping-cart': return (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-300" />
        </span>
      );
      default: return (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </span>
      );
    }
  };

  return (
    <header className={cn(
      "z-10 py-4 bg-background shadow-sm border-b border-border",
      className
    )}>
      <div className="flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={toggle}
            className="p-2 mr-3 text-muted-foreground rounded-md lg:hidden focus:outline-none hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-accent focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          
          {/* Notifications Dropdown */}
          <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <button className="p-1 relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute top-0 right-0 h-2 w-2 p-0 bg-destructive" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 bg-muted border-b">
                <div className="flex items-center justify-between">
                  <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
                  <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {notificationData.length} new
                  </Badge>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notificationData.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                    <Link href="#" className="w-full block px-4 py-3 hover:bg-muted">
                      <div className="flex">
                        <div className="flex-shrink-0 mr-3">
                          {getIconForNotification(notification.icon)}
                        </div>
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                <Link href="/notifications" className="w-full text-center p-3 text-sm font-medium text-primary hover:bg-muted">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user?.avatar || ""} alt={user?.fullName || "User"} />
                  <AvatarFallback>{user?.fullName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="hidden md:block">{user?.fullName || user?.username}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

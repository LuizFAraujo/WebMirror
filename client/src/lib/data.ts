import { User, Product, Order } from "@shared/schema";

// Sample chart data
export const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      name: 'Revenue',
      data: [65000, 59000, 80000, 81000, 56000, 55000, 40000, 58000, 69000, 78000, 85000, 96000],
      color: 'hsl(var(--chart-1))'
    },
    {
      name: 'Expenses',
      data: [42000, 49000, 45000, 51000, 36000, 35000, 30000, 38000, 49000, 48000, 55000, 66000],
      color: 'hsl(var(--chart-2))'
    }
  ]
};

export const usersChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      name: 'New Users',
      data: [1200, 1900, 1500, 2100, 1600, 1350, 1800, 2400, 2200, 2900, 3100, 3500],
      color: 'hsl(var(--chart-3))'
    },
    {
      name: 'Returning Users',
      data: [1800, 2100, 2200, 2300, 2100, 1900, 2400, 2800, 3000, 3300, 3400, 3800],
      color: 'hsl(var(--chart-4))'
    }
  ]
};

// Sample statistics
export const statCardsData = [
  {
    title: 'Total Revenue',
    value: 84686,
    change: 24,
    changeType: 'increase',
    comparison: 'vs $67,492 last month'
  },
  {
    title: 'New Customers',
    value: 1483,
    change: 12,
    changeType: 'increase',
    comparison: 'vs 1,329 last month'
  },
  {
    title: 'Active Users',
    value: 48592,
    change: 8,
    changeType: 'increase',
    comparison: 'vs 44,971 last month'
  },
  {
    title: 'Conversion Rate',
    value: 3.24,
    change: 3,
    changeType: 'decrease',
    comparison: 'vs 3.34% last month',
    isPercentage: true
  }
];

// User avatar URLs
export const userAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
];

// Product image URLs
export const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1511385348-a52b4096f9f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
];

// Navigation structure
export const sidebarNavigation = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    subItems: [
      { name: 'Analytics', path: '/' },
      { name: 'eCommerce', path: '/ecommerce' }
    ]
  },
  {
    name: 'Users',
    icon: 'user',
    path: '/users'
  },
  {
    name: 'Products',
    icon: 'shopping-cart',
    path: '/products'
  },
  {
    name: 'Orders',
    icon: 'file-list',
    path: '/orders'
  },
  {
    name: 'Pages',
    icon: 'pages',
    subItems: [
      { name: 'Login', path: '/auth' },
      { name: 'Register', path: '/auth?mode=register' },
      { name: 'Profile', path: '/profile' },
      { name: 'Settings', path: '/settings' }
    ]
  },
  {
    name: 'Settings',
    icon: 'settings',
    path: '/settings'
  }
];

// Notification data
export const notificationData = [
  {
    id: 1,
    title: 'New user registered',
    description: 'Emma Wilson just signed up',
    time: '5 minutes ago',
    icon: 'user-add',
    color: 'primary'
  },
  {
    id: 2,
    title: 'New order received',
    description: 'Order #45690 needs processing',
    time: '1 hour ago',
    icon: 'shopping-cart',
    color: 'green'
  }
];

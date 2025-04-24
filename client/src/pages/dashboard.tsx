import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { UsersChart } from "@/components/dashboard/users-chart";
import { OrdersTable } from "@/components/dashboard/orders-table";
import { ProductsList } from "@/components/dashboard/products-list";
import { DateRangeSelector } from "@/components/dashboard/date-range-selector";
import { statCardsData, revenueChartData, usersChartData } from "@/lib/data";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="mb-6">
        <Breadcrumbs 
          segments={[
            { name: "Home", href: "/" },
            { name: "Dashboard", href: "/" },
            { name: "Analytics" }
          ]}
        />
      </div>

      {/* Date Range Selector and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <DateRangeSelector />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCardsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            comparison={stat.comparison}
            isPercentage={stat.isPercentage}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart 
          data={revenueChartData.datasets} 
          labels={revenueChartData.labels} 
        />
        <UsersChart 
          data={usersChartData.datasets} 
          labels={usersChartData.labels} 
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrdersTable />
        </div>
        <div>
          <ProductsList />
        </div>
      </div>
    </MainLayout>
  );
}

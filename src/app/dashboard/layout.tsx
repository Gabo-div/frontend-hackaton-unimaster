export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex">
        <div className="bg-yellow-400 w-96 h-screen">el tu sabe de navegacion</div>
        <div>{children}</div>
      </div>
    );
  }
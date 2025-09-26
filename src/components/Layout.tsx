import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
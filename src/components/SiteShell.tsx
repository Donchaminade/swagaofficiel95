import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InstallPrompt } from "@/components/InstallPrompt";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-0 flex-1 flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0 max-md:landscape:pb-0">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <BottomNav />
      <InstallPrompt />
    </>
  );
}

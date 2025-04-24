import { createContext, useState, ReactNode, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarProviderState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

const initialState: SidebarProviderState = {
  isOpen: true,
  toggle: () => null,
  close: () => null,
  open: () => null,
};

export const SidebarContext = createContext<SidebarProviderState>(initialState);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  // Automatically close sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </SidebarContext.Provider>
  );
}

"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DashboardTitleProps {
  title: string;
}

export default function DashboardTitle({ title }: DashboardTitleProps) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="space-y-3 mb-8">
        <h1 className="text-4xl font-extrabold">{title}</h1>
        <p className="text-muted-foreground" suppressHydrationWarning>
          {format(time, "EEEE d MMMM yyyy, HH:mm:ss", { locale: id })}
        </p>
      </div>
    </>
  );
}

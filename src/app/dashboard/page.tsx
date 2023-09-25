"use client";

import useDashboard from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { navigationSemesters } = useDashboard();

  return (
    <div className="grid gap-4 grid-cols-3">
      {navigationSemesters.map((sem) => (
        <div
          key={"folder" + sem.id}
          onClick={() => router.push(`/dashboard/${sem.id}`)}
          className="p-4 border cursor-pointer border-gray-300 rounded-lg h-40 bg-slate-50 drop-shadow-md"
        >
          <div className="uppercase text-lg font-medium text-gray-800">{sem.name}</div>
        </div>
      ))}
    </div>
  );
}

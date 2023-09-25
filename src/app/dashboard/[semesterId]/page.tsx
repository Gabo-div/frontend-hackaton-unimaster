"use client";

import useDashboard from "@/hooks/useDashboard";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const subjectSchema = z.object({
  id: z.number(),
  teacher: z.string(),
  semesterId: z.number(),
  name: z.string(),
  uc: z.number(),
});

type Subject = z.infer<typeof subjectSchema>;

export default function SemesterPage() {
  const router = useRouter();
  const params = useParams();
  const { navigationSemesters, isLoading } = useDashboard();

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    if (navigationSemesters.length === 0) return;

    const a = navigationSemesters.find((sem) => sem.id === parseInt(params.semesterId as string));

    if (!a) {
      router.push("/dashboard");
      return;
    }

    setSubjects(a.subjects);
  }, [navigationSemesters]);

  return (
    <div className="grid gap-4 grid-cols-3">
      {subjects.length === 0 ? (
        <>No hay materias que mostrar</>
      ) : (
        <>
          {subjects.map((sub) => (
            <div
              key={"subfolder" + sub.id}
              onClick={() => router.push(`/dashboard/${params.semesterId}/${sub.id}`)}
              className="p-4 border cursor-pointer border-gray-300 rounded-lg  bg-slate-50 drop-shadow-md"
            >
              <div className="uppercase text-lg font-medium text-gray-800">{sub.name}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

"use client";

import NavSemesterSubject from "@/components/NavSemesterSubject";
import NavSemester from "@/components/NavSemester";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import AddSemesterModal from "@/components/AddSemesterModal";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import useDashboard from "@/hooks/useDashboard";
import AddSubjectModal from "@/components/AddSubjectModal";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [semesterModalOpen, setModalSemesterOpen] = useState(false);
  const [subjectModalOpen, setModalSubjectOpen] = useState(false);
  const [semesterId, setSemestersId] = useState<number>();

  useEffect(() => {
    if (!subjectModalOpen) {
      setSemestersId(undefined);
    }
  }, [subjectModalOpen]);

  const { user, navigationSemesters } = useDashboard();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {open ? (
          <div className="bg-slate-50 min-w-[300px] h-full overflow-y-scroll px-6 py-8 border-r flex flex-col border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-400 w-9 h-9 flex items-center justify-center rounded-full text-white font-bold">
                {user?.name[0]}
              </div>
              <div className="ml-2">
                <div className="text-lg font-medium">{user?.name}</div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="ml-auto bg-slate-200 h-10 w-10 flex items-center justify-center rounded-full"
              >
                <AiOutlineMenu className="text-xl" />
              </button>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button onClick={() => router.push("/dashboard")} className="font-medium hover:text-slate-400">
                Semestres
              </button>
              <button
                onClick={() => setModalSemesterOpen(true)}
                className="ml-auto h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200/70"
              >
                <AiOutlinePlus className="text-lg" />
              </button>
            </div>

            <div className="ml-4 mt-4 space-y-2">
              {navigationSemesters.map((s) => (
                <NavSemester
                  semesterId={s.id}
                  key={"semester" + s.id}
                  name={s.name}
                  onClick={() => {
                    setModalSubjectOpen(true);
                    setSemestersId(s.id);
                  }}
                >
                  {s.subjects.map((sub) => (
                    <NavSemesterSubject
                      semesterId={s.id}
                      subjectId={sub.id}
                      key={"semester" + sub.id}
                      name={sub.name}
                    />
                  ))}
                </NavSemester>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grow h-full">
          <div className="border-b border-gray-200 bg-slate-50 px-36 py-2 space-x-8 flex items-center relative">
            {!open ? (
              <button
                onClick={() => setOpen(true)}
                className="ml-auto bg-slate-300 h-10 w-10 flex items-center justify-center rounded-full absolute top-1/2 left-2 -translate-y-1/2"
              >
                <AiOutlineMenu className="text-xl" />
              </button>
            ) : null}
            <button className="cursor-pointer hover:bg-slate-200/80 h-8 w-8 rounded-full flex items-center justify-center">
              <BsChevronLeft className="text-2xl" />
            </button>
            <button className="cursor-pointer hover:bg-slate-200/80 h-8 w-8 rounded-full flex items-center justify-center">
              <BsChevronRight className="text-2xl" />
            </button>
          </div>
          <div className="py-20 px-36 overflow-y-scroll h-full">{children}</div>
        </div>
      </div>
      <AddSemesterModal open={semesterModalOpen} setOpen={setModalSemesterOpen} />
      <AddSubjectModal open={subjectModalOpen} setOpen={setModalSubjectOpen} semesterId={semesterId} />
    </>
  );
}

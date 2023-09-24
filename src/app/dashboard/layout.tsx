"use client";

import NavSemesterSubject from "@/components/NavSemesterSubject";
import NavSemester from "@/components/NavSemester";
import { useState } from "react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import AddSemesterModal from "@/components/AddSemesterModal";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [semesterModalOpen, setModalSemesterOpen] = useState(true);

  console.log(semesterModalOpen);

  return (
    <>
      <div className="flex">
        {open ? (
          <div className="bg-slate-50 min-w-[300px] h-screen px-6 py-8 border-r flex flex-col border-gray-200">
            <div className="flex items-center">
              <div className="bg-red-400 w-9 h-9 flex items-center justify-center rounded-full text-white font-bold">
                G
              </div>
              <div className="ml-2 text-lg font-medium">Gabo</div>

              <button
                onClick={() => setOpen(false)}
                className="ml-auto bg-slate-200 h-10 w-10 flex items-center justify-center rounded-full"
              >
                <AiOutlineMenu className="text-xl" />
              </button>
            </div>
            <div className="mt-10 flex items-center justify-between">
              <h3 className="font-medium">Semestres</h3>
              <button
                onClick={() => setModalSemesterOpen(true)}
                className="ml-auto h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200/70"
              >
                <AiOutlinePlus className="text-lg" />
              </button>
            </div>

            <div className="ml-4 mt-4 space-y-2">
              <NavSemester name="Semestre 1">
                <NavSemesterSubject name="Materia 1" />
                <NavSemesterSubject name="Materia 2" />
                <NavSemesterSubject name="Materia 3" />
              </NavSemester>
              <NavSemester name="Semestre 2">
                <NavSemesterSubject name="Materia 1" />
                <NavSemesterSubject name="Materia 2" />
                <NavSemesterSubject name="Materia 3" />
              </NavSemester>
            </div>
          </div>
        ) : null}

        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="ml-auto bg-slate-300 h-10 w-10 flex items-center justify-center rounded-full absolute top-2 left-2"
          >
            <AiOutlineMenu className="text-xl" />
          </button>
        ) : null}

        <div className="ml-20 mt-8">{children}</div>
      </div>
      <AddSemesterModal open={semesterModalOpen} setOpen={setModalSemesterOpen} />
    </>
  );
}

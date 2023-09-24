import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AddSemesterModal = ({ open, setOpen }: Props) => {
  return (
    <>
      {open ? (
        <>
          <div className="bg-black/30 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-100 rounded-t ">
                  <h3 className="text-2xl font=semibold">Agregar Semestre</h3>
                  <button
                    className="bg-slate-200/70 h-8 w-8 border-0 ml-auto flex items-center justify-center rounded-full"
                    onClick={() => setOpen(false)}
                  >
                    <AiOutlineClose className="text-xl" />
                  </button>
                </div>
                <div className="relative p-4 flex-auto">body</div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-100 rounded-b">
                  <button
                    className="text-red-400 background-transparent font-bold px-4 py-2 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Cerrar
                  </button>
                  <button
                    className="text-white bg-red-400 font-bold  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Crear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddSemesterModal;

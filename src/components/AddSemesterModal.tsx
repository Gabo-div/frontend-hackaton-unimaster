import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { z } from "zod";
import TextField from "./TextField";
import { apiURL } from "@/dependencies";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useDashboard from "@/hooks/useDashboard";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const newSemesterSchema = z.object({
  name: z.string().min(1).max(20),
});

type NewSemesterInput = z.infer<typeof newSemesterSchema>;

const AddSemesterModal = ({ open, setOpen }: Props) => {
  const { createSemester } = useDashboard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<NewSemesterInput>({
    resolver: zodResolver(newSemesterSchema),
  });

  const onSubmit: SubmitHandler<NewSemesterInput> = (values, e) => {
    e?.preventDefault();
    createSemester(values.name);
    closeModal();
  };

  const closeModal = () => {
    reset();
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <>
          <div className="bg-black/30 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[600px] my-6 mx-auto">
              <form
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-100 rounded-t ">
                  <h3 className="text-2xl font=semibold">Agregar Semestre</h3>
                  <button
                    className="bg-slate-200/70 h-8 w-8 border-0 ml-auto flex items-center justify-center rounded-full"
                    onClick={() => closeModal()}
                  >
                    <AiOutlineClose className="text-xl" />
                  </button>
                </div>
                <div className="relative p-4 flex-auto">
                  <TextField
                    label="Nombre"
                    name="name"
                    register={register}
                    required={true}
                    errors={errors}
                    errorMessage={
                      getValues().name == ""
                        ? "Ingrese un nombre para el semestre."
                        : "El nombre debe tener un maximo de 20 caracteres."
                    }
                  />
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-gray-100 rounded-b">
                  <button
                    className="text-red-400 background-transparent font-bold px-4 py-2 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => closeModal()}
                  >
                    Cerrar
                  </button>
                  <button
                    className="text-white bg-red-400 font-bold  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddSemesterModal;

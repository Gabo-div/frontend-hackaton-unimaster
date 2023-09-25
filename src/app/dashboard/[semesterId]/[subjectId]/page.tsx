"use client";

import TextField from "@/components/TextField";
import useSubjectAssignment from "@/hooks/useSubjectsAssigments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const assignmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.string().min(1),
  value: z.string().transform((s) => parseInt(s)),
});

type Assignment = z.infer<typeof assignmentSchema>;

export default function SubjectPage() {
  const params = useParams();

  const { assigments, createAssigment } = useSubjectAssignment({
    subjectId: parseInt(params.subjectId as string),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Assignment>({
    resolver: zodResolver(assignmentSchema),
  });

  const onSubmit: SubmitHandler<Assignment> = (values) => {
    createAssigment(values);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-8">Tareas</h2>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-gray-600">
            <th className="border px-4 py-2 font-medium">Nombre</th>
            <th className="border px-4 py-2 font-medium">Descripción</th>
            <th className="border px-4 py-2 font-medium">Tipo</th>
            <th className="border px-4 py-2 font-medium">Valor</th>
          </tr>
        </thead>
        <tbody>
          {assigments.map((as) => (
            <tr key={"table" + as.id}>
              <td className="border px-4 py-2">{as.name}</td>
              <td className="border px-4 py-2">{as.description}</td>
              <td className="border px-4 py-2">{as.type}</td>
              <td className="border px-4 py-2">{as.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
        <TextField
          label="Nombre"
          name="name"
          register={register}
          required={true}
          errors={errors}
          errorMessage={"Ingrese un nombre."}
        />

        <TextField
          label="Descripcrion"
          name="description"
          register={register}
          required={true}
          errors={errors}
          errorMessage={"Ingrese una descripcion."}
        />

        <TextField
          label="Tipo"
          name="type"
          register={register}
          required={true}
          errors={errors}
          errorMessage={"Ingrese un tipo."}
        />

        <TextField
          label="Valor"
          name="value"
          register={register}
          required={true}
          errors={errors}
          errorMessage={"Ingrese un valor"}
        />

        <button type="submit" className="w-full bg-yellow-300 p-2 rounded-full">
          Agregar Asignación
        </button>
      </form>
    </div>
  );
}

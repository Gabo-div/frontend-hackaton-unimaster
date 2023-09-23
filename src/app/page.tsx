"use client";

import TextField from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const singUpInputsSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1).email(),
  password: z.string().min(1).max(20),
});

type SingUpInputs = z.infer<typeof singUpInputsSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SingUpInputs>({
    resolver: zodResolver(singUpInputsSchema),
  });

  const onSubmit: SubmitHandler<SingUpInputs> = (inputs) => {
    console.log(inputs);
  };

  return (
    <main className="bg-yellow-300  h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] drop-shadow-2xl bg-white rounded-md p-12 border border-gray-300">
        <h1 className="font-medium text-3xl text-center">¡Bienvenido a UniMaster!</h1>
        <div className="mt-4 text-sm text-gray-600">
          Crea tu cuenta para empezar a organizar rápidamente tu vida universitaria
        </div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
          <TextField
            label="Nombre"
            name="name"
            register={register}
            required={true}
            errors={errors}
            errorMessage={
              getValues().name == "" ? "Ingrese un nombre." : "El nombre no puede ser mayor a 50 caracteres."
            }
          />

          <TextField
            type="email"
            label="Email"
            name="email"
            register={register}
            required={true}
            errors={errors}
            errorMessage={"Ingrese un email válido."}
          />

          <TextField
            type="password"
            label="Contraseña"
            name="password"
            register={register}
            required={true}
            errors={errors}
            errorMessage={
              getValues().password == ""
                ? "Ingrese una contraseña."
                : "La contraseña no puede ser mayor a 20 caracteres."
            }
          />

          <button className="w-full bg-yellow-300 p-3 rounded-full">Registrase</button>
        </form>
        <div className="mt-8 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-blue-500">
            inicia sesión
          </Link>
        </div>
      </div>
    </main>
  );
}

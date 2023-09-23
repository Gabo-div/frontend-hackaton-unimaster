"use client";

import TextField from "@/components/TextField";
import { apiURL } from "@/dependencies";
import { SingUpInputs, singUpInputsSchema } from "@/types/SingUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SingUpInputs>({
    resolver: zodResolver(singUpInputsSchema),
  });

  const mutation = useMutation({
    mutationFn: async (inputs: SingUpInputs) => {
      const res = await fetch(`${apiURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      return z
        .object({
          id: z.number(),
          name: z.string(),
          email: z.string().email(),
        })
        .parse(data.data.user);
    },
    onSuccess: (res) => {
      toast.success("¡Usuario registrado con exito!");
      router.push("/login");
    },
    onError: () => {
      toast.error("Parece que el email ya existe");
    },
  });

  const onSubmit: SubmitHandler<SingUpInputs> = (inputs, e) => {
    e?.preventDefault();
    mutation.mutate(inputs);
  };

  return (
    <main className="bg-yellow-300  h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] drop-shadow-2xl bg-white rounded-xl p-12 border border-gray-300">
        <div className="flex justify-center">
          <Image alt="logo" src="/logo.png" width={200} height={200} />
        </div>
        <h3 className="font-medium text-3xl text-center">¡Bienvenido a UniMaster!</h3>
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
                : "La contraseña debe estar entre 8 y 20 caracteres."
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

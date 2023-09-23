"use client";

import TextField from "@/components/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiURL } from "@/dependencies";
import { toast } from "react-toastify";

const singUpInputsSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).max(20),
});

type SingUpInputs = z.infer<typeof singUpInputsSchema>;

export default function Login() {
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
      const res = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      return z.string().parse(data.data.token);
    },
    onSuccess: (res) => {
      window.localStorage.setItem("token", res);
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Ocurrió un error");
    },
  });

  const onSubmit: SubmitHandler<SingUpInputs> = (inputs) => {
    mutation.mutate(inputs);
  };

  return (
    <main className="bg-yellow-300  h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] drop-shadow-2xl bg-white rounded-md p-12 border border-gray-300">
        <h1 className="font-medium text-3xl text-center">¡Bienvenido de vuelta!</h1>
        <div className="mt-4 text-sm text-gray-600 text-center">Inicia sesión y encontrarás todo como lo dejaste</div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-2 mt-6">
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

          <button className="w-full bg-yellow-300 p-3 rounded-full">Iniciar Sesión</button>
        </form>
        <div className="mt-8 text-center">
          ¿No tienes una cuenta?{" "}
          <Link href="/" className="text-blue-500">
            registrate
          </Link>
        </div>
      </div>
    </main>
  );
}

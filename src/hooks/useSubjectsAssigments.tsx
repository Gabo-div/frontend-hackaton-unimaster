import { apiURL } from "@/dependencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const assignmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullish(),
  type: z.string(),
  value: z.number(),
  points: z.number().nullish(),
  date: z.date().nullish(),
});

type Assignment = z.infer<typeof assignmentSchema>;

type Props = {
  subjectId: number;
};

export default function useSubjectAssignment({ subjectId }: Props) {
  const router = useRouter();
  const [assigments, setAssigments] = useState<Assignment[]>([]);
  const [token, setToken] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    if (!userToken) {
      router.push("/");
      return;
    }
    setToken(userToken);
  }, []);

  const assigmentQuery = useQuery({
    queryKey: ["assignment"],
    queryFn: async () => {
      const res = await axios({
        method: "GET",
        url: `${apiURL}/assignments/${subjectId}`,
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      return assignmentSchema.array().parse(res.data.data.subject);
    },
    enabled: !!token,
  });

  const assigmentMutation = useMutation({
    mutationFn: async (data: Omit<Assignment, "id">) => {
      const res = await axios({
        method: "POST",
        url: `${apiURL}/assignments/${subjectId}`,
        headers: {
          authorization: `bearer ${token}`,
        },
        data,
      });

      return assignmentSchema.parse(res.data.data.subject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignment"] });
    },
  });

  const createAssigment = (data: Omit<Assignment, "id">) => {
    assigmentMutation.mutate(data);
  };

  useEffect(() => {
    if (!assigmentQuery.data) return;

    console.log(assigmentQuery.data);

    setAssigments(assigmentQuery.data);
  }, [assigmentQuery.data]);

  return {
    assigments,
    createAssigment,
  };
}

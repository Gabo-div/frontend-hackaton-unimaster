import { apiURL } from "@/dependencies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { toast } from "react-toastify";

const assignmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  value: z.number(),
  points: z.number(),
  date: z.date(),
});

type Assignment = z.infer<typeof assignmentSchema>;

const subjectSchema = z.object({
  id: z.number(),
  teacher: z.string(),
  semesterId: z.number(),
  name: z.string(),
  uc: z.number(),
  assignments: assignmentSchema.array(),
});

type Subject = z.infer<typeof subjectSchema>;

const semesterSchema = z.object({
  id: z.number(),
  name: z.string(),
  subjects: subjectSchema.array(),
});

type Semester = z.infer<typeof semesterSchema>;

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
});

type User = z.infer<typeof userSchema>;

type NavigationSemesters = Semester & {
  subjects: Omit<Subject, "assignments">[];
};

export default function useDashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setLoading] = useState(false);

  const [navigationSemesters, setNavigationSemesters] = useState<NavigationSemesters[]>([]);

  const [semesters, setSemesters] = useState<Omit<Semester, "subjects">[]>([]);
  const [subjects, setSubjects] = useState<Omit<Subject, "assignments">[]>([]);

  useEffect(() => {
    setLoading(true);
    const navSemester = semesters.map((sem) => ({
      ...sem,
      subjects: subjects.filter((sub) => sub.semesterId === sem.id),
    }));

    setNavigationSemesters(navSemester as NavigationSemesters[]);

    setLoading(false);
  }, [semesters, subjects]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    if (!userToken) {
      router.push("/");
      return;
    }
    setToken(userToken);
  }, []);

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${apiURL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${token}`,
        },
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
    onError: () => {
      router.push("/");
    },
    onSuccess: (user) => {
      setUser(user);
    },
    enabled: !!token,
  });

  const semestersQuery = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      setLoading(true);
      if (!token) return [];

      const res = await axios({
        method: "GET",
        url: `${apiURL}/semesters`,
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      const semesters = semesterSchema.omit({ subjects: true }).array().parse(res.data.data.semesters);

      return semesters;
    },
    onError: () => {
      setLoading(false);
      toast.error("Ocurrió un error al cargar los semestres");
    },
    enabled: !!token,
  });

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      setLoading(true);
      if (semesters.length === 0) return [];

      const responses = await Promise.all(
        semesters.map((sem) =>
          axios({
            method: "GET",
            url: `${apiURL}/subjects/${sem.id}`,
            headers: {
              authorization: `bearer ${token}`,
            },
          })
        )
      );

      const subjects = responses.flatMap((res) =>
        subjectSchema.omit({ assignments: true }).array().parse(res.data.data.subject)
      );

      return subjects;
    },
    onError: () => {
      setLoading(false);
      toast.error("Ocurrió un error al cargar las materias");
    },
    onSuccess: (subjects) => {
      setLoading(false);
    },
    enabled: semesters.length > 0,
  });

  const createSemesterMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await axios({
        method: "POST",
        url: `${apiURL}/semesters`,
        data: {
          name,
        },
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      return semesterSchema.omit({ subjects: true }).parse(res.data.data.semester);
    },
    onError: () => {
      toast.error("Ocurrió un error al crear el semestre");
    },
    onSuccess: (semester) => {
      toast.success("¡Semestre creado con exito!");
      queryClient.invalidateQueries({ queryKey: ["semesters"] });
    },
  });

  const createSubjectMutation = useMutation({
    mutationFn: async ({
      name,
      teacher,
      uc,
      semesterId,
    }: {
      name: string;
      teacher: string;
      uc: number;
      semesterId: number;
    }) => {
      const res = await axios({
        method: "POST",
        url: `${apiURL}/subjects/${semesterId}`,
        data: {
          name,
          teacher,
          uc,
        },
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      return subjectSchema.omit({ assignments: true }).parse(res.data.data.subject);
    },
    onError: () => {
      toast.error("Ocurrió un error al crear la materia");
    },
    onSuccess: (semester) => {
      toast.success("Materia creada con exito!");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  useEffect(() => {
    console.log(subjectsQuery.data);
    if (!subjectsQuery.data) return;
    setSubjects(subjectsQuery.data);
  }, [subjectsQuery.data]);

  useEffect(() => {
    if (!semestersQuery.data) return;
    setSemesters(semestersQuery.data);
  }, [semestersQuery.data]);

  const createSemester = (name: string) => {
    createSemesterMutation.mutate(name);
  };

  const createSubject = (data: { name: string; teacher: string; uc: number; semesterId: number }) => {
    createSubjectMutation.mutate(data);
  };

  return {
    user,
    semesters,
    subjects,
    createSemester,
    navigationSemesters,
    createSubject,
    isLoading,
  };
}

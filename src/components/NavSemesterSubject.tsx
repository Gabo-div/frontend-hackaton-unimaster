import { useRouter } from "next/navigation";
import { AiOutlineFileText } from "react-icons/ai";

type Props = {
  name: string;
  semesterId: number;
  subjectId: number;
};

export default function NavSemesterSubject({ name, subjectId, semesterId }: Props) {
  const router = useRouter();

  return (
    <div className="ml-8 flex flex-col space-y-2">
      <button
        onClick={() => router.push(`/dashboard/${semesterId}/${subjectId}`)}
        className="flex w-full items-center hover:bg-slate-300/70  cursor-pointer px-4 py-2 rounded-lg"
      >
        <div>
          <AiOutlineFileText className="text-2xl" />
        </div>
        <div className="px-2">{name}</div>
      </button>
    </div>
  );
}

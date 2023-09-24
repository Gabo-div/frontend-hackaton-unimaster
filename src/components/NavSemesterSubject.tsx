import { AiOutlineFileText } from "react-icons/ai";

type Props = {
  name: string;
};

export default function NavSemesterSubject({ name }: Props) {
  return (
    <div className="ml-8 flex flex-col space-y-2">
      <div className="flex w-full items-center hover:bg-slate-300/70  cursor-pointer px-4 py-2 rounded-lg">
        <div>
          <AiOutlineFileText className="text-2xl" />
        </div>
        <div className="ml-2">{name}</div>
      </div>
    </div>
  );
}

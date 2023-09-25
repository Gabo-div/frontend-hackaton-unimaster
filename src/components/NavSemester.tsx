import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { AiOutlinePlus, AiOutlineFolder } from "react-icons/ai";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

type Props = {
  name: string;
  semesterId: number;
  children: ReactNode;
  onClick?: () => void;
};

export default function NavSemester({ name, children, onClick, semesterId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className="flex flex-wrap items-center cursor-pointer pl-4 py-1 ">
        <button
          onClick={() => router.push(`/dashboard/${semesterId}`)}
          className="flex flex-wrap items-center hover:text-slate-600/70 cursor-pointer "
        >
          <div>
            <AiOutlineFolder className="text-2xl" />
          </div>
          <div className="px-3">{name}</div>
        </button>
        <div className="ml-auto flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200/70"
          >
            {open ? <BsChevronDown className="text-lg" /> : <BsChevronRight className="text-lg" />}
          </button>
          <button
            onClick={onClick}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200/70"
          >
            <AiOutlinePlus className="text-lg" />
          </button>
        </div>
      </div>
      <div className={"space-y-2 mt-4 overflow-hidden " + (open ? "h-fit" : "h-0")}>{children}</div>
    </div>
  );
}

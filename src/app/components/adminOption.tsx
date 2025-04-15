/* eslint-disable prettier/prettier */
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

type AdminOptionProps = {
  image: string;
  title: string;
  action: string;
  directory: string;
};

export function AdminOption({ image, title, action, directory }: AdminOptionProps) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col md:w-4/5">
      <img
        src={image}
        alt="Imagem do campo"
        className="h-44 w-full rounded-t-xl object-cover sm:h-60"
      />
      <div className="flex items-center justify-between gap-2 rounded-b-xl bg-blue-primary p-2 text-center text-white lg:p-4">
        <h1 className="font-league text-xl font-semibold lg:text-4xl">
          {title}
        </h1>
        <div className="flex w-1/5 items-center justify-center px-2">
          <Button
            onClick={() => navigate(directory)}
            className="flex w-full items-center justify-center py-1 font-league text-sm font-semibold lg:py-2 lg:text-2xl"
          >
            {action}
          </Button>
        </div>
      </div>
    </div>
  );
}

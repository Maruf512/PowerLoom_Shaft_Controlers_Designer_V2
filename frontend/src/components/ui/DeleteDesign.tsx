import React from "react";
import Button from "./Button";

const DeleteDesign = ({
  data,
  deleteHandler,
  setIsOpen,
}: {
  data: { name: string; id: number } | undefined;
  deleteHandler: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col gap-6 lg:p-6 p-4 bg-on-surface rounded-radius-lg">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-foreground">Delete Design</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-muted-foreground">
            Are you sure you want to delete the design named
            <span className="font-bold text-foreground">{`"${data?.name}"`}</span>
            ?
          </p>
          <p className=" text-destructive-foreground">
            This action cannot be undone.
          </p>
        </div>
        <div className="text-strong font-semibold space-y-1">
          <p className="text-xs text-muted-foreground">ID: {data?.id}</p>
          <p className="text-xs text-muted-foreground">Name: {data?.name}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button onClick={() => setIsOpen(false)} variant={"outline"}>
          Cancel
        </Button>
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteDesign;

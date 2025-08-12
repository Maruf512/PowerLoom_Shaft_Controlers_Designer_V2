import apiClient from "@/lib/apiClient";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Overlay from "./Overlay";
import { useToast } from "./ToastProvider";
import useFetchState from "@/hooks/useFetchState";
import Button from "./Button";

const ColorAdd = ({
  setReload,
}: {
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");
  const [colorError, setColorError] = useState("");
  const { loading: colorLoading, setLoading: setColorLoading } =
    useFetchState();
  const toast = useToast();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e !== "string") setColor(e.target.value);
    if (typeof e === "string") setColor(e);
    setColorError("");
  };

  const handelSaveColor = async () => {
    const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (!hexRegex.test(color)) {
      setColorError("Please enter a valid hex color code.");
      return;
    }

    setColorError("");

    setColorLoading(true);
    const { error } = await apiClient("designer/colors", {
      method: "POST",
      body: { color },
    });

    setColorLoading(false);

    if (error) {
      toast("Error adding color", "error");
      return;
    }
    setReload((prev) => !prev);
    setColor("");
    toast("Color added successfully", "success");
  };

  return (
    <div>
      <div
        className="p-1 rounded-full bg-primary text-muted duration-200 relative"
        onClick={() => setIsOpen(true)}
      >
        <IoMdAdd />
        <Overlay
          setIsOpen={setIsOpen}
          className={cn(
            "absolute lg:-left-[10rem] -left-[16rem] top-10 z-30 transition-all duration-200 ease-in-out",
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="bg-white dark:bg-surface border border-muted rounded-xl shadow-xl p-4 w-72 space-y-3">
            <h3 className="text-base font-semibold text-foreground text-primary">
              Add New Color
            </h3>

            <div className="flex gap-3 justify-between">
              <div className="flex-col">
                <input
                  type="text"
                  placeholder="#RRGGBB"
                  className="w-full px-3 py-2 text-xs rounded-radius-sm border border-muted text-primary focus:outline-none h-8"
                  onChange={(e) => handelChange(e)}
                  value={color}
                />
                <p className="error-text">{colorError}</p>
              </div>
              <div className="">
                <input
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
                  type="color"
                  onChange={(e) => handelChange(e.target.value)}
                  value={color}
                />
              </div>
            </div>

            <div className="flex justify-start">
              <Button
                className="text-xs bg-primary text-white cursor-pointer rounded-radius-sm "
                onClick={handelSaveColor}
                isLoading={colorLoading}
              >
                Add Color
              </Button>
            </div>
          </div>
        </Overlay>
      </div>
    </div>
  );
};

export default ColorAdd;

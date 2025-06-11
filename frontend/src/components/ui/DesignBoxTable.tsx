import { DesignGridType, DesignType } from "@/types/data";
import { useEffect, useMemo, useState } from "react";
import { BiCheckbox } from "react-icons/bi";

const DesignBoxTable = ({
  designerData,
  setDesignerData,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
}) => {
  const createInitialDesignGrids = useMemo(() => {
    const totalPalettes = designerData.total_color_palettes || 0;
    return () => {
      const girdArray = new Array(totalPalettes);
      return girdArray.fill(null).map(() => ({
        color_box: null,
        total_pics: 0,
      }));
    };
  }, [designerData.total_color_palettes]);

  const [designGrids, setDesignGrids] = useState<DesignGridType[]>(
    createInitialDesignGrids()
  );

  useEffect(() => {
    setDesignGrids(createInitialDesignGrids());
  }, [designerData.total_color_palettes, createInitialDesignGrids]);

  const deisignGridRow = useMemo(() => {
    return new Array(4).fill(null).map((_, i) => `Box ${i + 1}`);
  }, [designerData]);

  const handelColorBox = (columnbNum: number, rowNum: number) => {
    setDesignGrids((prev) => {
      const newGrids = [...prev];

      if (newGrids[columnbNum]) {
        const newColorBoxValue =
          newGrids[columnbNum].color_box === rowNum + 1 ? null : rowNum + 1;

        newGrids[columnbNum] = {
          ...newGrids[columnbNum],
          color_box: newColorBoxValue,
        };
      }

      setDesignerData((prev) => ({ ...prev, design_grids: newGrids }));

      return newGrids;
    });
  };

  const handleTotalPicsChange = (columnIndex: number, value: string) => {
    setDesignGrids((prevGrids) => {
      const newGrids = [...prevGrids];

      if (newGrids[columnIndex]) {
        newGrids[columnIndex] = {
          ...newGrids[columnIndex],
          total_pics: parseInt(value) || 0,
        };
      }

      setDesignerData((prev) => ({ ...prev, design_grids: newGrids }));

      return newGrids;
    });
  };

  console.log(designerData);
  console.log(designGrids);

  return (
    <div className="border border-muted w-full rounded-radius-lg">
      <div className="flex justify-between bg-secondary border-b border-muted lg:px-6 px-3 py-2 font-semibold text-basec gap-2">
        {deisignGridRow.map((item) => (
          <p className="flex-1" key={item}>
            {item}
          </p>
        ))}
        <p className="flex-1">NOCV</p>
      </div>
      <div>
        {designGrids.map((item, columbNum) => (
          <div
            key={columbNum}
            className="flex justify-between lg:px-6 px-3 py-2 border-b border-muted last:border-none gap-2 text-strong bg-on-surface"
          >
            {deisignGridRow.map((_, rowNum) => (
              <div key={rowNum} className="flex-1">
                <BiCheckbox
                  onClick={() => handelColorBox(columbNum, rowNum)}
                  className={`cursor-pointer text-xl ${
                    item.color_box === rowNum + 1
                      ? "text-blue-500"
                      : "text-basec"
                  }`}
                />
              </div>
            ))}
            <div className="flex-1">
              <input
                className="w-full border border-muted rounded-xs px-3 bg-secondary "
                type="number"
                placeholder=""
                value={item.total_pics === 0 ? "" : item.total_pics}
                onChange={(e) =>
                  handleTotalPicsChange(columbNum, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignBoxTable;

// import { DesignGridType, DesignType } from "@/types/data";
// import { useEffect, useMemo, useState } from "react";
// import { BiCheckbox } from "react-icons/bi";

// const DesignBoxTable = ({
//   designerData,
//   setDesignerData,
// }: {
//   designerData: DesignType;
//   setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
// }) => {
//   const createInitialDesignGrids = useMemo(() => {
//     const totalPalettes = designerData.total_color_palettes || 0;
//     return () => {
//       const girdArray = new Array(totalPalettes);
//       return girdArray.fill(null).map(() => ({
//         color_box: null,
//         total_pics: 0,
//       }));
//     };
//   }, [designerData.total_color_palettes]);

//   const [designGrids, setDesignGrids] = useState<DesignGridType[]>(
//     createInitialDesignGrids()
//   );

//   useEffect(() => {
//     setDesignGrids(createInitialDesignGrids());
//   }, [designerData.total_color_palettes, createInitialDesignGrids]);

//   const deisignGridRow = useMemo(() => {
//     return new Array(4).fill(null).map((_, i) => `Box ${i + 1}`);
//   }, [designerData]);

//   const handelColorBox = (columnbNum: number, rowNum: number) => {
//     setDesignGrids((prev) => {
//       const newGrids = [...prev];

//       if (newGrids[columnbNum]) {
//         const newColorBoxValue =
//           newGrids[columnbNum].color_box === rowNum + 1 ? null : rowNum + 1;

//         newGrids[columnbNum] = {
//           ...newGrids[columnbNum],
//           color_box: newColorBoxValue,
//         };
//       }

//       setDesignerData((prev) => ({ ...prev, design_grids: newGrids }));

//       return newGrids;
//     });
//   };

//   const handleTotalPicsChange = (columnIndex: number, value: string) => {
//     setDesignGrids((prevGrids) => {
//       const newGrids = [...prevGrids];

//       if (newGrids[columnIndex]) {
//         newGrids[columnIndex] = {
//           ...newGrids[columnIndex],
//           total_pics: Number(value) || 0,
//         };
//       }

//       setDesignerData((prev) => ({ ...prev, design_grids: newGrids }));

//       return newGrids;
//     });
//   };

//   console.log(designerData);
//   console.log(designGrids);

//   return (
//     <div className="border border-muted w-full rounded-radius-lg">
//       <div className="flex justify-between bg-secondary border-b border-muted lg:px-6 px-3 py-2 font-semibold text-basec gap-2">
//         {deisignGridRow.map((item) => (
//           <p className="flex-1" key={item}>
//             {item}
//           </p>
//         ))}
//         <p className="flex-1">NOCV</p>
//       </div>
//       <div>
//         {designGrids.map((item, columbNum) => (
//           <div
//             key={columbNum}
//             className="flex justify-between lg:px-6 px-3 py-2 border-b border-muted last:border-none gap-2 text-strong bg-on-surface"
//           >
//             {deisignGridRow.map((_, rowNum) => (
//               <div key={rowNum} className="flex-1">
//                 <BiCheckbox
//                   onClick={() => handelColorBox(columbNum, rowNum)}
//                   className={`cursor-pointer text-xl ${
//                     item.color_box === rowNum + 1
//                       ? "text-blue-500"
//                       : "text-basec"
//                   }`}
//                 />
//               </div>
//             ))}
//             <div className="flex-1">
//               <input
//                 className="w-full border border-muted rounded-xs px-3 bg-secondary "
//                 type="number"
//                 placeholder=""
//                 value={item.total_pics === 0 ? "" : item.total_pics}
//                 onChange={(e) =>
//                   handleTotalPicsChange(columbNum, e.target.value)
//                 }
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DesignBoxTable;

import { DesignType } from "@/types/data";
import { useEffect, useMemo } from "react";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const DesignBoxTable = ({
  designerData,
  setDesignerData,
}: {
  designerData: DesignType;
  setDesignerData: React.Dispatch<React.SetStateAction<DesignType>>;
}) => {
  useEffect(() => {
    const totalColorPalettes = designerData.total_color_palettes || 0;

    if (designerData.design_grids.length !== totalColorPalettes) {
      setDesignerData((prev) => ({
        ...prev,
        design_grids: new Array(totalColorPalettes)
          .fill(null)
          .map((_) => ({ color_box: null, total_pics: null })),
      }));
    }
  }, [designerData.total_color_palettes]);

  const deisignGridRow = useMemo(() => {
    return new Array(4).fill(null).map((_, i) => `Box ${i + 1}`);
  }, [designerData]);

  const handelColorBox = (columnbNum: number, rowNum: number) => {
    setDesignerData((prev) => {
      const newGrids = [...prev.design_grids];
      newGrids[columnbNum] = {
        ...newGrids[columnbNum],
        color_box:
          newGrids[columnbNum].color_box === rowNum + 1 ? null : rowNum + 1,
      };
      return { ...prev, design_grids: newGrids };
    });
  };

  const handleTotalPicsChange = (columnIndex: number, value: string) => {
    setDesignerData((prev) => {
      const newGrids = [...prev.design_grids];
      if (newGrids[columnIndex]) {
        newGrids[columnIndex] = {
          ...newGrids[columnIndex],
          total_pics: Number(value) <= 0 ? null : Number(value),
        };
      }
      return { ...prev, design_grids: newGrids };
    });
  };

  console.log(designerData);

  return (
    <div className="border border-muted w-full rounded-radius-lg h-[52rem] overflow-auto">
      <div className="flex justify-between border-b border-muted lg:px-6 px-4 py-3 tracking-wide font-semibold text-basec gap-2 text-xs lg:text-base sticky top-0 z-40 bg-on-surface">
        <p className="lg:w-[4rem] w-[2rem]">No.</p>
        {deisignGridRow.map((item) => (
          <p className="flex-1" key={item}>
            {item}
          </p>
        ))}
        <p className="flex-1">NOCV</p>
      </div>
      <div className="">
        {!!designerData.design_grids.length ? (
          <div>
            {designerData.design_grids.map((item, columbNum) => (
              <div
                key={columbNum}
                className="flex justify-between items-center py-2 lg:px-6 px-4 border-b border-muted/70 last:border-none gap-2 text-strong bg-on-surface hover:bg-secondary text-xs lg:text-base"
              >
                <p className="lg:w-[4rem] w-[2rem] lg:text-sm">
                  {columbNum + 1}
                </p>

                {deisignGridRow.map((_, rowNum) => (
                  <div
                    key={rowNum}
                    className="flex-1"
                    onClick={() => handelColorBox(columbNum, rowNum)}
                  >
                    {designerData.design_grids[columbNum].color_box ===
                    rowNum + 1 ? (
                      <IoIosCheckbox />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </div>
                ))}
                <div className="flex-1">
                  <input
                    className="w-full border border-muted rounded-xs px-3 text-xs py-1"
                    type="number"
                    placeholder=""
                    value={item.total_pics === null ? "" : item.total_pics}
                    onChange={(e) =>
                      handleTotalPicsChange(columbNum, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5 text-basec font-semibold text-xl">
            Enter Total Color Palettes
          </p>
        )}
      </div>
    </div>
  );
};

export default DesignBoxTable;

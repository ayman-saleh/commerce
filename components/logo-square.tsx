import clsx from "clsx";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx(
        "flex flex-none items-center justify-center bg-black text-white font-bold dark:bg-white dark:text-black",
        {
          "h-[40px] w-[40px] rounded-xl text-[14px]": !size,
          "h-[30px] w-[30px] rounded-lg text-[10px]": size === "sm",
        },
      )}
    >
      BG
    </div>
  );
}

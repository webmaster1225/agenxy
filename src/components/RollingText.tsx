export function RollingText({
  text,
  className = "",
  ember = false,
}: {
  text: string;
  className?: string;
  ember?: boolean;
}) {
  return (
    <span className={`rolling ${ember ? "rolling-ember" : ""} ${className}`}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} style={{ ["--i" as string]: i }}>
          {char}
        </span>
      ))}
    </span>
  );
}

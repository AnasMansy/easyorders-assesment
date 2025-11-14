import { Link } from "react-router-dom";

type NavigationProps = {
  items: string[];
};

export default function Navigation({ items }: NavigationProps) {
  return (
    <nav className="container my-8" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center font-medium">
        {items.map((label, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${label}-${i}`}
              className={`flex items-center text-[14px] md:text-[1rem] ${
                i > 0 ? "before:mx-2 before:content-['>']" : ""
              }`}
            >
              {isLast ? (
                <span className="text-lightDark">{label}</span>
              ) : (
                <Link to="/" className="text-grayprimary">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

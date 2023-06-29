export enum SortDirection {
  Asc,
  Desc,
  None,
}

export function SortIcon(props: {
  direction: SortDirection;
  onClick?: () => void;
}) {
  // function onClick() {
  //   if (props.direction === SortDirection.Asc) {
  //     props.onClick(SortDirection.Desc);
  //   } else if (props.direction === SortDirection.Desc) {
  //     props.onClick(SortDirection.None);
  //   } else {
  //     props.onClick(SortDirection.Asc);
  //   }
  // }

  let svg: JSX.Element;

  if (props.direction === SortDirection.Desc) {
    svg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label="Sorted descending"
        data-darkreader-inline-stroke=""
        className="rotate-180"
      >
        <path d="M12 5l0 14"></path>
        <path d="M18 11l-6 -6"></path>
        <path d="M6 11l6 -6"></path>
      </svg>
    );
  } else if (props.direction === SortDirection.Asc) {
    svg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-label="Sorted descending"
        data-darkreader-inline-stroke=""
      >
        <path d="M12 5l0 14"></path>
        <path d="M18 11l-6 -6"></path>
        <path d="M6 11l6 -6"></path>
      </svg>
    );
  } else {
    svg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        data-darkreader-inline-stroke=""
      >
        <path d="M8 7l4 -4l4 4"></path>
        <path d="M8 17l4 4l4 -4"></path>
        <path d="M12 3l0 18"></path>
      </svg>
    );
  }

  return (
    <div
      className="ml-[10px] inline-block -translate-y-[1px] fill-table-sort align-middle text-table-sort"
      onClick={props.onClick}
    >
      {svg}
    </div>
  );
}

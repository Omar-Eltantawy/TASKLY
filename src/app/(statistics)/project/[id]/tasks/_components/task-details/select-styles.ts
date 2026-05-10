// import { StylesConfig } from "react-select";

// const selectStyles: StylesConfig = {
//   control: (base) => ({
//     ...base,
//     border: "none",
//     boxShadow: "none",
//     backgroundColor: "transparent",
//     minHeight: "32px",
//     cursor: "pointer",
//     "&:hover": { borderColor: "transparent" },
//   }),

//   valueContainer: (base) => ({
//     ...base,
//     padding: "0 4px",
//   }),

//   dropdownIndicator: (base) => ({
//     ...base,
//     padding: "0 4px",
//   }),

//   indicatorSeparator: () => ({
//     display: "none",
//   }),

//   menu: (base) => ({
//     ...base,
//     zIndex: 100,
//     borderRadius: "4px",
//     boxShadow: "0 4px 24px 0 #041B3C1A",
//   }),

//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? "#E8EDFF"
//       : state.isFocused
//         ? "#F1F3FF"
//         : "white",
//     color: "#041B3C",
//     cursor: "pointer",
//   }),
// };

// export default selectStyles;

import { StylesConfig } from "react-select";

const selectStyles = <T>(): StylesConfig<T, false> => ({
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    minHeight: "32px",
    cursor: "pointer",
    "&:hover": { borderColor: "transparent" },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 4px",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 4px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menu: (base) => ({
    ...base,
    zIndex: 100,
    borderRadius: "4px",
    boxShadow: "0 4px 24px 0 #041B3C1A",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#E8EDFF"
      : state.isFocused
        ? "#F1F3FF"
        : "white",
    color: "#041B3C",
    cursor: "pointer",
  }),
});

export default selectStyles;

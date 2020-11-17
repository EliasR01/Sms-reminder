import { makeStyles, Theme } from "@material-ui/core/styles";

interface BoxProps {
  startColumn: number;
  endColumn: number;
  startRow: number;
  endRow: number;
  margin: string;
}

export const UseBoxStyles = makeStyles<Theme, BoxProps>(() => ({
  root: {
    gridColumnStart: ({ startColumn }) => startColumn,
    gridColumnEnd: ({ endColumn }) => endColumn,
    gridRowStart: ({ startRow }) => startRow,
    gridRowEnd: ({ endRow }) => endRow,
    minWidth: "310px",
    minHeight: "160px",
    margin: ({ margin }) => margin,
    background:
      "radial-gradient(circle, rgba(236,241,245,1) 26%, rgba(218,227,228,1) 78%)",
    overflow: "auto",
    msOverflowStyle: "none",
    border: 0,
    borderRadius: "3px",
    boxShadow: "0 3px 5px 2px rgba(0,0,0, 0.4)",
    textAlign: "center",
  },
}));

export const UseContainerStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "inline-grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gridGap: "20px",
  },
});

export const UseInputStyles = makeStyles({
  root: {
    marginBottom: "2%",
  },
});

export const UseTextFieldStyles = makeStyles({
  root: {
    marginBottom: "2%",
  },
});

export const UseButtonStyles = makeStyles({
  root: {
    marginBottom: "1%",
  },
});

export const UseAvatarStyles = makeStyles({
  root: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#b0b0b0",
    },
  },
});

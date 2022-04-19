import { GridLocation } from "../../util/grid";

export type BoardRowName = "1" | "2" | "3" | "4";
export const boardRowNames: BoardRowName[] = ["1", "2", "3", "4"];

export type BoardColumnName = "A" | "B" | "C";
export const boardColumnNames: BoardColumnName[] = ["A", "B", "C"];

export type BoardSpaceName = `${BoardColumnName}${BoardRowName}`;

export function gridRowToBoardRowName(gridRow: number): BoardRowName {
  return boardRowNames[gridRow];
}

export function gridColumnToBoardColumnName(
  gridColumn: number
): BoardColumnName {
  return boardColumnNames[gridColumn];
}

export function gridLocationToBoardSpaceName(
  gridLocation: GridLocation
): BoardSpaceName {
  return `${gridColumnToBoardColumnName(
    gridLocation.column
  )}${gridRowToBoardRowName(gridLocation.row)}`;
}

export function boardRowNameToGridRow(rowName: BoardRowName): number {
  const rowOffset = boardRowNames.indexOf(rowName);
  if (rowOffset < 0) {
    throw new Error(`invalid row name: ${rowName}`);
  }
  return rowOffset;
}

export function boardColumNameToGridColumn(
  columnName: BoardColumnName
): number {
  const columnOffset = boardColumnNames.indexOf(columnName);
  if (columnOffset < 0) {
    throw new Error(`invalid column name: ${columnName}`);
  }
  return columnOffset;
}

export function boardSpaceNameToGridLocation(
  space: BoardSpaceName
): GridLocation {
  const [columnName, rowName] = space as unknown as [
    BoardColumnName,
    BoardRowName
  ];

  return {
    row: boardRowNameToGridRow(rowName),
    column: boardColumNameToGridColumn(columnName),
  };
}

import _ from "lodash";
import { Tuple } from "./tuple";

export type GridN<
  T,
  Rows extends number = number,
  Columns extends number = number
> = Tuple<Tuple<T, Columns>, Rows>;

export type Grid<Rows extends number, Columns extends number, T> = Tuple<
  Tuple<T, Columns>,
  Rows
>;

export type Grid4x3<T> = Grid<4, 3, T>;

export type GridLocation = {
  row: number;
  column: number;
};

export function map2D<T, U>(
  arr2D: T[][],
  iteratee: (value: T, location: GridLocation) => U
) {
  const columnCount = _.max(_.map(arr2D, (row) => row.length)) || 0;
  return _.map(arr2D, (row, gridRow) => {
    return _.times(columnCount, (gridColumn) => {
      const value = row[gridColumn];
      return iteratee(value, { row: gridRow, column: gridColumn });
    });
  });
}

export function flatMap2D<T, U>(
  arr2D: T[][],
  iteratee: (value: T, location: GridLocation) => U
) {
  const columnCount = _.max(_.map(arr2D, (row) => row.length)) || 0;
  return _.flatMap(arr2D, (row, gridRow) => {
    return _.times(columnCount, (gridColumn) => {
      const value = row[gridColumn];
      return iteratee(value, { row: gridRow, column: gridColumn });
    });
  });
}

export function fill2D<
  T,
  Rows extends number = number,
  Columns extends number = number
>(rows: Rows, columns: Columns, value: T): Grid<Rows, Columns, T> {
  return _.times(rows, () => {
    return _.times(columns, () => value);
  }) as Grid<Rows, Columns, T>;
}

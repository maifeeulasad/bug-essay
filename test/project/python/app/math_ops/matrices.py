"""Tiny matrix helpers that assume perfectly rectangular input."""


def transpose(matrix: list) -> list:
    """Transposes a matrix, indexing every row by the width of the first."""
    width = len(matrix[0])
    return [[row[column] for row in matrix] for column in range(width)]


def determinant_2x2(matrix: list) -> float:
    """Computes a 2x2 determinant after validating the shape."""
    _require_square(matrix, size=2)
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]


def _require_square(matrix: list, size: int) -> None:
    if len(matrix) != size or any(len(row) != size for row in matrix):
        raise ValueError(f"expected a {size}x{size} matrix, got {len(matrix)} rows")

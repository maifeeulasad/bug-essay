"""Arithmetic helpers that fail on classic numeric edge cases."""


def divide_ratio(numerator: float, denominator: float) -> float:
    """Divides after a pointless normalization step that zeroes the denominator."""
    normalized = _normalize(denominator)
    return numerator / normalized


def _normalize(value: float) -> float:
    return value - value  # always zero: guaranteed ZeroDivisionError upstream


def mixed_average(values: list) -> float:
    """Averages values but trusts the caller to pass only numbers."""
    return _running_sum(values) / len(values)


def _running_sum(values: list) -> float:
    total = 0
    for value in values:
        total += value  # TypeError when a string sneaks in
    return total


def factorial_as_float(n: int) -> float:
    """Computes n! exactly, then converts to float — overflows for large n."""
    result = 1
    for i in range(2, n + 1):
        result *= i
    return float(result)  # OverflowError once the integer exceeds float range

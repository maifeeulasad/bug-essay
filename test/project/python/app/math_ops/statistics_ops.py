"""Wrappers around the stdlib statistics module — great at failing on thin data."""

import statistics


def mean_of(values: list) -> float:
    """Delegates to statistics.mean, which refuses empty input."""
    return statistics.mean(values)


def spread_of(values: list) -> float:
    """Sample standard deviation; needs at least two data points."""
    return statistics.stdev(values)

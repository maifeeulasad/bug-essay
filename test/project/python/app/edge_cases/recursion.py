"""Unbounded recursion under a tightened limit (keeps the traceback short)."""

import sys


def measure_depth(limit: int = 64) -> int:
    """Recurses with no base case; RecursionError after ~`limit` frames."""
    previous = sys.getrecursionlimit()
    sys.setrecursionlimit(limit)
    try:
        return _descend(0)
    finally:
        sys.setrecursionlimit(previous)


def _descend(depth: int) -> int:
    return _descend(depth + 1)

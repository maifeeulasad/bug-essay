"""Turns raised exceptions into structured records and forwards them to a sink."""

from __future__ import annotations

import datetime
import platform
import traceback

from .mongo_sink import TraceSink


class ExceptionCapture:
    """Context manager that captures any exception, logs it, and suppresses it.

    The raw traceback text is stored exactly as Python would print it, so
    downstream consumers (the Bug Essay extension) can parse it with the
    standard traceback grammar.
    """

    def __init__(self, sink: TraceSink, scenario: str) -> None:
        self._sink = sink
        self._scenario = scenario

    def __enter__(self) -> "ExceptionCapture":
        return self

    def __exit__(self, exc_type, exc, tb) -> bool:
        if exc_type is None:
            return False
        self._sink.write(build_record(self._scenario, exc_type, exc, tb))
        return True  # suppress so the scenario runner can continue


def build_record(scenario: str, exc_type: type, exc: BaseException, tb) -> dict:
    """Builds the MongoDB document for one captured exception."""
    raw = "".join(traceback.format_exception(exc_type, exc, tb))
    return {
        "language": "python",
        "scenario": scenario,
        "exceptionType": exc_type.__name__,
        "message": str(exc),
        "rawTraceback": raw,
        "host": platform.node(),
        "createdAt": datetime.datetime.now(datetime.timezone.utc),
    }

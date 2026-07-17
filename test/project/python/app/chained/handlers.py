"""Implicit chaining: the error handler itself blows up."""


def fetch_with_fallback() -> str:
    """Falls back after a connection error, but the fallback bookkeeping is buggy.

    Produces a 'During handling of the above exception, another exception
    occurred' chain.
    """
    try:
        return _primary_endpoint()
    except ConnectionError:
        _record_failure()
        return _secondary_endpoint()


def _primary_endpoint() -> str:
    raise ConnectionError("primary endpoint refused the connection")


def _secondary_endpoint() -> str:
    return "secondary-payload"


def _record_failure() -> None:
    counters: dict = {}
    counters["failures"] += 1  # KeyError while the ConnectionError is being handled

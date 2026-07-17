"""Explicit chaining: the low-level OSError becomes a domain error."""


class ConfigurationError(RuntimeError):
    """Raised when application configuration cannot be loaded."""


def load_config(path: str = "missing/app.toml") -> str:
    """Loads config, wrapping I/O failures in a domain-level error.

    Produces a 'The above exception was the direct cause of...' chain.
    """
    try:
        return _read(path)
    except OSError as error:
        raise ConfigurationError(f"cannot load configuration from {path}") from error


def _read(path: str) -> str:
    with open(path, encoding="utf-8") as handle:
        return handle.read()

"""Filesystem helpers exercising OSError subclasses."""


def read_settings(path: str = "config/settings.that.does.not.exist.toml") -> str:
    """Reads a settings file that was never shipped; FileNotFoundError."""
    with open(path, encoding="utf-8") as handle:
        return handle.read()


def write_into_directory() -> None:
    """Opens the current directory for writing, which no OS allows.

    PermissionError on Windows, IsADirectoryError on POSIX — both are
    OSError subclasses, which is exactly the edge we want captured.
    """
    with open(".", "w", encoding="utf-8") as handle:
        handle.write("this never happens")

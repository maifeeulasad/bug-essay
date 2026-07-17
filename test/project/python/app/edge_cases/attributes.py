"""Attribute and operand type errors from optimistic duck typing."""


class Profile:
    """A user profile with just enough surface to break callers."""

    def __init__(self, name: str) -> None:
        self.name = name


def display_name(profile: Profile) -> str:
    """Title-cases the profile name; AttributeError when profile is None."""
    return profile.name.title()


def broken_lookup() -> str:
    """Simulates a cache miss returning None that nobody checked."""
    return display_name(None)


def merge_tags(existing: list, extra) -> list:
    """Concatenates tag collections; TypeError when types disagree."""
    return existing + extra

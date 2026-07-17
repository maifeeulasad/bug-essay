"""Generator protocol edge cases: exhaustion and injected failures."""


def countdown(start: int):
    """Yields start, start-1, ..., 1 and then stops."""
    while start > 0:
        yield start
        start -= 1


def take(generator, count: int) -> list:
    """Pulls `count` items; StopIteration once the generator runs dry."""
    return [next(generator) for _ in range(count)]


def inject_failure() -> None:
    """Throws an exception into a suspended generator frame."""
    gen = countdown(10)
    next(gen)
    gen.throw(ValueError("injected mid-generation"))

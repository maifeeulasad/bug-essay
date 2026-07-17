"""A minimal stack with a domain-specific empty error."""


class EmptyStackError(LookupError):
    """Raised when popping from an empty stack."""


class Stack:
    """Classic LIFO stack over a Python list."""

    def __init__(self) -> None:
        self._items: list = []

    def push(self, item) -> None:
        self._items.append(item)

    def pop(self):
        if not self._items:
            raise EmptyStackError("pop from an empty stack")
        return self._items.pop()

    def __len__(self) -> int:
        return len(self._items)


def drain(stack: Stack, count: int) -> list:
    """Pops `count` items; explodes when the stack runs dry first."""
    return [stack.pop() for _ in range(count)]

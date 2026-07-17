"""stdlib queue wrappers exercising the Full/Empty edge cases."""

import queue


def overfill(capacity: int, items: list) -> "queue.Queue":
    """Puts items without blocking; queue.Full once capacity is exceeded."""
    bounded: "queue.Queue" = queue.Queue(maxsize=capacity)
    for item in items:
        bounded.put_nowait(item)
    return bounded


def take_from_empty():
    """Non-blocking get from a fresh queue; always queue.Empty."""
    empty: "queue.Queue" = queue.Queue()
    return empty.get_nowait()

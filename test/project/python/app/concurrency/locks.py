"""Lock misuse: the two classic ways to hurt yourself with threading.Lock."""

import threading


def release_unheld_lock() -> None:
    """Releases a lock nobody holds; RuntimeError."""
    lock = threading.Lock()
    lock.release()


def reacquire_non_reentrant() -> None:
    """Tries to re-acquire a non-reentrant lock and gives up quickly.

    Uses a short timeout instead of deadlocking the scenario runner.
    """
    lock = threading.Lock()
    lock.acquire()
    try:
        if not lock.acquire(timeout=0.1):
            raise TimeoutError("could not re-acquire non-reentrant lock held by this thread")
    finally:
        lock.release()

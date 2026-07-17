"""Worker threads whose failures are re-raised on the main thread."""

import threading


def run_failing_worker() -> None:
    """Runs a batch job on a worker thread and surfaces its exception.

    The re-raise keeps the worker's original traceback, so the captured
    stack shows frames from inside the thread.
    """
    holder: dict = {}

    def work() -> None:
        try:
            _process_batch([1, 2, "three", 4])
        except Exception as error:  # noqa: BLE001 - handed back to the caller
            holder["error"] = error

    worker = threading.Thread(target=work, name="batch-worker")
    worker.start()
    worker.join()

    if "error" in holder:
        raise holder["error"]


def _process_batch(items: list) -> int:
    total = 0
    for item in items:
        total += item * 2  # TypeError when the batch contains a string
    return total

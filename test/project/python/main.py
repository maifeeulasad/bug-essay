"""Runs every failure scenario and logs the captured exceptions to MongoDB.

Run from this directory:

    python main.py --once            # one pass over all scenarios
    python main.py --loop 15         # re-run every 15 seconds (feeds the extension)
    python main.py --only strings    # only scenarios whose name contains "strings"

The Mongo URI defaults to mongodb://localhost:27017 and can be overridden with
--uri or the BUG_ESSAY_MONGO_URI environment variable. When Mongo (or pymongo)
is unavailable the runner falls back to printing records on the console.
"""

import argparse
import os
import time

from exception_logger.handler import ExceptionCapture
from exception_logger.mongo_sink import TraceSink, create_sink
from scenarios import SCENARIOS


def run_all(sink: TraceSink, only: str = "") -> int:
    """Runs every (matching) scenario, capturing whatever it raises."""
    executed = 0
    for scenario in SCENARIOS:
        if only and only not in scenario.name:
            continue
        with ExceptionCapture(sink, scenario.name):
            scenario.run()
        executed += 1
    return executed


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--uri", default=os.environ.get("BUG_ESSAY_MONGO_URI", "mongodb://localhost:27017"))
    parser.add_argument("--database", default="bug_essay")
    parser.add_argument("--collection", default="exceptions")
    parser.add_argument("--loop", type=float, default=0,
                        help="seconds between passes; 0 (or --once) runs a single pass")
    parser.add_argument("--once", action="store_true", help="run a single pass and exit")
    parser.add_argument("--only", default="", help="substring filter on scenario names")
    args = parser.parse_args()

    sink = create_sink(args.uri, args.database, args.collection)
    try:
        while True:
            executed = run_all(sink, args.only)
            print(f"[bug-essay] captured {executed} scenario exception(s)")
            if args.once or args.loop <= 0:
                break
            time.sleep(args.loop)
    finally:
        sink.close()


if __name__ == "__main__":
    main()

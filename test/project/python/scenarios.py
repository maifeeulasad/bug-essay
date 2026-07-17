"""Registry of every runnable failure scenario in the sample app."""

from dataclasses import dataclass
from typing import Callable

from app.chained import causes, handlers
from app.concurrency import locks, workers
from app.data_structures import queues, stacks, trees
from app.edge_cases import attributes, custom_errors, generators, recursion
from app.io_ops import files, network
from app.math_ops import arithmetic, matrices, statistics_ops
from app.string_ops import formatting, parsing


@dataclass(frozen=True)
class Scenario:
    """One named, runnable way for the sample app to fail."""

    name: str
    description: str
    run: Callable[[], object]


SCENARIOS: tuple = (
    Scenario("math.divide_ratio", "ZeroDivisionError via a zeroing normalizer",
             lambda: arithmetic.divide_ratio(10, 4)),
    Scenario("math.mixed_average", "TypeError when a string sneaks into a sum",
             lambda: arithmetic.mixed_average([1, "2", 3])),
    Scenario("math.factorial_overflow", "OverflowError converting 200! to float",
             lambda: arithmetic.factorial_as_float(200)),
    Scenario("math.transpose_ragged", "IndexError transposing a ragged matrix",
             lambda: matrices.transpose([[1, 2, 3], [4]])),
    Scenario("math.determinant_shape", "ValueError for a non-2x2 determinant",
             lambda: matrices.determinant_2x2([[1, 2, 3]])),
    Scenario("math.mean_empty", "StatisticsError averaging an empty list",
             lambda: statistics_ops.mean_of([])),
    Scenario("math.stdev_single", "StatisticsError: stdev needs two points",
             lambda: statistics_ops.spread_of([42])),
    Scenario("strings.missing_field", "KeyError from an unfilled template field",
             lambda: formatting.render_greeting("Hello {name}, you are {age}", name="Ada")),
    Scenario("strings.bad_payload", "UnicodeDecodeError on binary garbage",
             lambda: formatting.decode_payload(b"\xff\xfe\xfa")),
    Scenario("strings.negative_padding", "ValueError from a negative format width",
             lambda: formatting.pad_columns([["a", "b"]], -3)),
    Scenario("strings.port_not_int", "ValueError parsing a non-numeric port",
             lambda: parsing.parse_port("eight-zero-eight-zero")),
    Scenario("strings.manifest_syntax", "JSONDecodeError on a malformed manifest",
             lambda: parsing.load_manifest('{"name": "app", "version": }')),
    Scenario("structures.pop_empty_stack", "custom EmptyStackError from drain()",
             lambda: stacks.drain(stacks.Stack(), 1)),
    Scenario("structures.overfill_queue", "queue.Full — exception with no message",
             lambda: queues.overfill(1, ["a", "b"])),
    Scenario("structures.take_from_empty_queue", "queue.Empty — also message-less",
             lambda: queues.take_from_empty()),
    Scenario("structures.missing_branch", "KeyError walking a missing tree branch",
             lambda: trees.node_at(trees.sample_tree(), ["root", "middle"])),
    Scenario("structures.walk_past_leaf", "TypeError indexing into a leaf value",
             lambda: trees.node_at(trees.sample_tree(), ["root", "left", "value", "deeper"])),
    Scenario("io.read_missing_settings", "FileNotFoundError for unshipped config",
             lambda: files.read_settings()),
    Scenario("io.write_into_directory", "PermissionError/IsADirectoryError writing '.'",
             lambda: files.write_into_directory()),
    Scenario("io.gateway_timeout", "custom GatewayTimeout from the fake gateway",
             lambda: network.fetch_profile(7)),
    Scenario("io.resolve_bad_host", "socket.gaierror for a .invalid hostname",
             lambda: network.resolve_host("bug-essay.invalid")),
    Scenario("concurrency.worker_failure", "TypeError raised inside a worker thread",
             lambda: workers.run_failing_worker()),
    Scenario("concurrency.release_unheld", "RuntimeError releasing an unheld lock",
             lambda: locks.release_unheld_lock()),
    Scenario("concurrency.lock_timeout", "TimeoutError re-acquiring a held lock",
             lambda: locks.reacquire_non_reentrant()),
    Scenario("chained.config_cause", "ConfigurationError chained with 'from' (direct cause)",
             lambda: causes.load_config()),
    Scenario("chained.retry_handler", "KeyError raised during ConnectionError handling",
             lambda: handlers.fetch_with_fallback()),
    Scenario("edge.unbounded_recursion", "RecursionError under a tightened limit",
             lambda: recursion.measure_depth()),
    Scenario("edge.exhaust_countdown", "StopIteration pulling too many items",
             lambda: generators.take(generators.countdown(2), 5)),
    Scenario("edge.inject_failure", "ValueError thrown into a suspended generator",
             lambda: generators.inject_failure()),
    Scenario("edge.none_profile", "AttributeError on a None profile",
             lambda: attributes.broken_lookup()),
    Scenario("edge.merge_mismatch", "TypeError concatenating list and str",
             lambda: attributes.merge_tags(["a"], "b")),
    Scenario("edge.out_of_stock", "custom OutOfStockError with structured fields",
             lambda: custom_errors.reserve("ABC-123", 99)),
)

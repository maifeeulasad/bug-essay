"""Nested-dict trees and a path walker that trusts the path."""


def sample_tree() -> dict:
    """A small fixed tree used by the walking scenarios."""
    return {"root": {"left": {"value": 1}, "right": {"value": 2}}}


def node_at(tree: dict, path: list):
    """Walks the tree along `path`.

    KeyError when a branch is missing; TypeError when the path walks past
    a leaf and tries to index into a plain value.
    """
    current = tree
    for key in path:
        current = current[key]
    return current

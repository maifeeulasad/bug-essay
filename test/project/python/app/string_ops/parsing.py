"""Parsing helpers for config-style input."""

import json


def parse_port(raw: str) -> int:
    """Parses a TCP port; ValueError for anything non-numeric."""
    port = int(raw)
    if not 0 < port < 65536:
        raise ValueError(f"port {port} outside the valid range 1-65535")
    return port


def load_manifest(text: str) -> dict:
    """Parses a JSON manifest; json.JSONDecodeError on malformed syntax."""
    return json.loads(text)

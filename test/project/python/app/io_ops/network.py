"""Simulated network layer — no sockets needed to time out convincingly."""

import socket


class GatewayTimeout(TimeoutError):
    """Raised when the fake upstream gateway takes too long."""


def fetch_profile(user_id: int) -> dict:
    """Fetches a user profile through the always-slow gateway."""
    response = _request(f"/users/{user_id}")
    return {"id": user_id, "raw": response}


def _request(route: str) -> str:
    raise GatewayTimeout(f"upstream took too long serving {route}")


def resolve_host(hostname: str) -> str:
    """Resolves a hostname; socket.gaierror for unresolvable names."""
    return socket.gethostbyname(hostname)

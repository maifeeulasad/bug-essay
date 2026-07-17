"""Sinks that persist captured exception records."""

from __future__ import annotations

import json
from abc import ABC, abstractmethod


class TraceSink(ABC):
    """Destination for captured exception records."""

    @abstractmethod
    def write(self, record: dict) -> None:
        """Persists a single exception record."""

    def close(self) -> None:
        """Releases any underlying resources."""


class ConsoleTraceSink(TraceSink):
    """Fallback sink that prints records; used when MongoDB is unavailable."""

    def write(self, record: dict) -> None:
        printable = {**record, "createdAt": record["createdAt"].isoformat()}
        summary = json.dumps(printable)
        print(f"[console-sink] {summary[:160]}{'...' if len(summary) > 160 else ''}")


class MongoTraceSink(TraceSink):
    """Persists exception records into a MongoDB collection."""

    def __init__(self, uri: str, database: str, collection: str) -> None:
        # Imported lazily so the console fallback works without pymongo installed.
        from pymongo import MongoClient

        self._client = MongoClient(uri, serverSelectionTimeoutMS=2000)
        self._collection = self._client[database][collection]
        self._client.admin.command("ping")

    def write(self, record: dict) -> None:
        self._collection.insert_one(record)

    def close(self) -> None:
        self._client.close()


def create_sink(uri: str, database: str, collection: str) -> TraceSink:
    """Returns a Mongo sink when reachable, console sink otherwise."""
    try:
        return MongoTraceSink(uri, database, collection)
    except Exception as error:  # noqa: BLE001 - any failure means fallback
        print(f"[bug-essay] mongo unavailable ({error!r}); falling back to console sink")
        return ConsoleTraceSink()

"""A small custom exception hierarchy raised through domain logic."""


class AppError(Exception):
    """Base class for domain errors in the sample application."""


class InventoryError(AppError):
    """Anything wrong with stock management."""


class OutOfStockError(InventoryError):
    """Raised when a reservation exceeds the available stock."""

    def __init__(self, sku: str, requested: int, available: int) -> None:
        super().__init__(f"sku {sku}: requested {requested}, only {available} left")
        self.sku = sku
        self.requested = requested
        self.available = available


def reserve(sku: str, quantity: int) -> int:
    """Reserves stock for a SKU, failing loudly when there isn't enough."""
    available = _stock_level(sku)
    if quantity > available:
        raise OutOfStockError(sku, quantity, available)
    return quantity


def _stock_level(sku: str) -> int:
    return len(sku) % 3  # deterministic, tiny, and frequently zero

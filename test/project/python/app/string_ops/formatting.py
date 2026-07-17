"""Formatting helpers that trust their inputs a little too much."""


def render_greeting(template: str, **fields: str) -> str:
    """Fills a template; KeyError when the template references a missing field."""
    return template.format(**fields)


def decode_payload(payload: bytes) -> str:
    """Decodes a payload as UTF-8; UnicodeDecodeError on binary garbage."""
    return payload.decode("utf-8")


def pad_columns(rows: list, width: int) -> list:
    """Right-aligns every cell; a negative width poisons the format spec."""
    return [_pad_cell(cell, width) for row in rows for cell in row]


def _pad_cell(cell: str, width: int) -> str:
    return f"{cell:>{width}}"

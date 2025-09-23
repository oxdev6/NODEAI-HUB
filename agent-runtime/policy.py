from typing import Any


class AllowAllPolicy:
    def __init__(self, max_steps: int = 3):
        self.max_steps = max_steps

    def assert_allowed(self, job: Any) -> None:
        return

    def within_budget(self, state: Any) -> bool:
        return len(state.history) < self.max_steps



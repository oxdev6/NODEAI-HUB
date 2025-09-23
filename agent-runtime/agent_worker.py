from typing import Any, Dict, Protocol
from pydantic import BaseModel


class Tool(Protocol):
    def decide(self, model_output: str) -> "Action":
        ...


class Action(Protocol):
    def run(self) -> Dict[str, Any]:
        ...


class Policy(Protocol):
    def assert_allowed(self, job: "Job") -> None:
        ...

    def within_budget(self, state: "State") -> bool:
        ...


class ModelClient(Protocol):
    def generate(self, prompt: str) -> str:
        ...


class Job(BaseModel):
    input: str

    def initial_state(self) -> "State":
        return State(history=[], done_flag=False)


class State(BaseModel):
    history: list
    done_flag: bool

    def next_prompt(self) -> str:
        return str(self.history[-1]) if self.history else "Start"

    def update(self, model_output: str, action_result: Dict[str, Any]) -> "State":
        new_hist = self.history + [(model_output, action_result)]
        return State(history=new_hist, done_flag=False)

    def done(self) -> bool:
        return self.done_flag

    def finalize(self) -> Dict[str, Any]:
        return {"history": self.history}


class AgentWorker:
    def __init__(self, tools: Tool, model_client: ModelClient, policy: Policy):
        self.tools = tools
        self.model = model_client
        self.policy = policy

    def handle(self, job: Job) -> Dict[str, Any]:
        self.policy.assert_allowed(job)
        state = job.initial_state()
        while not state.done() and self.policy.within_budget(state):
            prompt = state.next_prompt()
            out = self.model.generate(prompt)
            action = self.tools.decide(out)
            result = action.run()
            state = state.update(out, result)
        return state.finalize()



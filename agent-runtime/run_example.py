from agent_worker import AgentWorker, Job
from model_client import StubModelClient
from policy import AllowAllPolicy
from tools.rpc import RpcTool


def main() -> None:
    worker = AgentWorker(
        tools=RpcTool(default_endpoint="https://rpc.nodeops.example"),
        model_client=StubModelClient(),
        policy=AllowAllPolicy(max_steps=2),
    )
    job = Job(input="Hello")
    result = worker.handle(job)
    print(result)


if __name__ == "__main__":
    main()

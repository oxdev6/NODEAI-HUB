from typing import Any, Dict


class RpcAction:
    def __init__(self, endpoint: str, payload: Dict[str, Any]):
        self.endpoint = endpoint
        self.payload = payload

    def run(self) -> Dict[str, Any]:
        # Placeholder forwarding; wire NodeOps RPC here
        return {"endpoint": self.endpoint, "payload": self.payload, "status": "ok"}


class RpcTool:
    def __init__(self, default_endpoint: str):
        self.default_endpoint = default_endpoint

    def decide(self, model_output: str) -> RpcAction:
        return RpcAction(self.default_endpoint, {"data": model_output})



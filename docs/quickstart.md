# Quickstart

## Prerequisites

- Node.js 18+, Python 3.10+
- Docker/Kubernetes (optional for serving tests)

## Run Control Plane API (dev)

```
cd services/control-plane
npm install
npm run dev
```

## Run Agent Runtime example

```
cd agent-runtime
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python run_example.py
```

## Use the CLI (dev)

```
cd cli
npm install
npm run dev -- login
npm run dev -- agents run treasury-bot --input "Hello"
```

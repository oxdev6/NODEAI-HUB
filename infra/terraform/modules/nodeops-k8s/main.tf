# Placeholder module to define the NodeOps K8s cluster interface.
# Replace with real resources (e.g., cloud-managed K8s, node groups, networking) in implementation.

locals {
  cluster_name = var.name
}

output "cluster_name" {
  value       = local.cluster_name
  description = "Logical name of the cluster"
}

output "node_groups" {
  value       = var.node_groups
  description = "Echo of requested node groups"
}



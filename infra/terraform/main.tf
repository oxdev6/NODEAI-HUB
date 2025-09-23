module "nodeops_cluster" {
  source = "./modules/nodeops-k8s"

  name       = var.env
  region     = var.region
  node_groups = var.node_groups
}

output "cluster_name" {
  description = "Logical cluster name"
  value       = module.nodeops_cluster.cluster_name
}

output "node_groups" {
  description = "Node groups as provisioned/logically defined"
  value       = module.nodeops_cluster.node_groups
}



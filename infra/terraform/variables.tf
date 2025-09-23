variable "env" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
}

variable "region" {
  description = "Cloud region identifier"
  type        = string
}

variable "node_groups" {
  description = "Map of node group definitions"
  type = map(object({
    instance_type = string
    min           = number
    max           = number
    gpu           = optional(number)
  }))
}



variable "name" {
  description = "Cluster name"
  type        = string
}

variable "region" {
  description = "Region"
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



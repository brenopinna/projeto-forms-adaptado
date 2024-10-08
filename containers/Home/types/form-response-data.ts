export interface FormResponseData {
  fields: {
    name: string
    label: string
    placeholder: string
    type: string
    required: boolean
    id: string
  }[]
  submitText: string
  title: string
  description: string
  operation: string
}

import { CalenderEntity } from '@/Domain/Entity';
type CalenderProps = {
  data: CalenderEntity[],
}

type SetLabelColor = {
  [key: string]: string
}

export type { CalenderProps, SetLabelColor };
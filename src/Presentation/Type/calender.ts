import { CalenderEntity } from "@/Domain/Entity";
type CalenderProps = {
  data: CalenderEntity[];
  updateNowDate: (n: number) => void;
};

type SetLabelColor = {
  [key: string]: string;
};

export type { CalenderProps, SetLabelColor };

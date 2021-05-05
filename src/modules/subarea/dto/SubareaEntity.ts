export class SubareaEntity {
  id: string;
  label: string;
  desc: string;
  children: SubareaChildren[];
}
type SubareaChildren = Omit<SubareaEntity, 'children'>;

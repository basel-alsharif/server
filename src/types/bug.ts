interface IGetAllBugs {
  status?: string;
  priority?: string;
  assignedTo?: string;
}
interface Bug {
  title: string;
  description: string;
  priority: string;
  status?: string | undefined;
  assignedTo?: string | undefined;
}
export { IGetAllBugs, Bug };

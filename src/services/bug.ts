import { Bug } from '../models';
import { IGetAllBugs, Bug as BugType } from '../types';

const getAllBugs = async ({ status, priority, assignedTo }:IGetAllBugs) => {
  const whereCondition = {
    status,
    priority,
    assignedTo,
  };
  if (!status) delete whereCondition.status;
  if (!priority) delete whereCondition.priority;
  if (!assignedTo) delete whereCondition.assignedTo;
  const bugs = await Bug.findAll({
    where: whereCondition,
  });
  return bugs;
};

const createBug = async ({ title, description, priority }:BugType) => {
  const createdBug = await Bug.create(
    {
      title,
      description,
      priority,
    },
  );
  return createdBug;
};

const updateBug = async (id:number, {
  priority, status, assignedTo,
}:IGetAllBugs) => {
  const updatedBug = await Bug.findByPk(id);
  if (!updatedBug) throw new Error('Bug not found');
  updatedBug.priority = priority || updatedBug.priority;
  updatedBug.status = status || updatedBug.status;
  updatedBug.assignedTo = assignedTo || updatedBug.assignedTo;
  await updatedBug.save();
  return updatedBug;
};

export {
  getAllBugs,
  createBug,
  updateBug,
};

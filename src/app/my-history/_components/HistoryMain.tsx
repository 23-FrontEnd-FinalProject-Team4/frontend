'use client';
import { TaskHistory } from '@/apis/user/type';
import ListItemDate from '@/components/listItem/ListItemDate';
import TaskCheckbox from '@/components/taskCheckbox/TaskCheckbox';
import { formatISODate, formatYearMonthDay } from '@/utils/date';

const HistoryMain = ({ tasks }: { tasks: TaskHistory[] }) => {
  const grouped = Object.groupBy(tasks, (task) => formatISODate(new Date(task.date)));
  Object.values(grouped).forEach((items) => {
    items?.sort((a, b) => a.displayIndex - b.displayIndex);
  });

  return (
    <>
      {Object.entries(grouped).map(([date, items]) => {
        return (
          <div key={date} className="flex flex-col gap-3">
            <h2 className="text-text-default text-lg font-semibold">
              {formatYearMonthDay(new Date(date))}
            </h2>
            {items &&
              items.map((task) => {
                return (
                  <div
                    className={`text-text-default outline-border-primary flex justify-between gap-3 rounded-2xl px-3.5 py-3 outline ${
                      task.doneAt ? 'bg-background-secondary' : 'bg-background-primary'
                    }`}
                    key={task.id}
                  >
                    <TaskCheckbox
                      task={task.name}
                      checked={Boolean(task.doneAt)}
                      size="lg"
                      disabled
                    />
                    <ListItemDate date={task.date} frequency={task.frequency} />
                  </div>
                );
              })}
          </div>
        );
      })}
    </>
  );
};

export default HistoryMain;

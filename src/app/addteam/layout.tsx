import { AddTeamLayoutProps } from './type';

const AddTeamLayout = ({ children }: AddTeamLayoutProps) => {
  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full items-center justify-center p-4">
      <div className="w-full max-w-[550px]">{children}</div>
    </div>
  );
};

export default AddTeamLayout;

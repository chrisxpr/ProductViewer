export const ListHeader = ({ title }) => {
  return (
    <>
      <div className="flex flex-row justify-between px-5">
        <div className="flex space-x-4">
          <h2 className="font-bold text-3xl">{title}</h2>
        </div>
        <div className="flex items-center space-x-6"></div>
      </div>
    </>
  );
};

import { ListHeader } from '../components/shared/listHeader';

export const Complete = () => {
  return (
    <>
      <div className="flex flex-col p-5">
        <ListHeader title="Order Complete" />
        <div className="flex flex-col p-5">Thank you for your order</div>
      </div>
    </>
  );
};

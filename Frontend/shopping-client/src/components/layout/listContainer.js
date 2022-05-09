export const ListContainer = ({
  isLoadingList,
  loadingError,
  list,
  listEmptyMessage,
  children,
  type,
}) => {
  return (
    <>
      <div className="p-5">
        {isLoadingList && (
          <div className="px-4 py-3 leading-normal text-blue-700 rounded border-2 border-gray-100">
            <p>Loading ...</p>
          </div>
        )}
        {loadingError && (
          <div className="px-4 py-3 leading-normal text-red-700 rounded-lg border-2 border-gray-100">
            <p>{loadingError}</p>
          </div>
        )}
        {list &&
          (list.length === 0 ? (
            <>
              <div className="px-4 py-3 leading-normal text-blue-700 rounded-lg border-2 border-gray-100">
                <p>{listEmptyMessage}</p>
              </div>
            </>
          ) : (
            <>
              {type === 'TABLE' && (
                <>
                  <div className="flex flex-row justify-between px-5 py-5">
                    {children}
                  </div>
                </>
              )}
              {type === 'GRID' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-between">
                    {children}
                  </div>
                </>
              )}
            </>
          ))}
      </div>
    </>
  );
};

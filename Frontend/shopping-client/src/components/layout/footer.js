import { shoppingConfig } from '../../shoppingConfig';

const footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-white">
        <div className="mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <span>
                  {year} © {shoppingConfig.siteName}
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;

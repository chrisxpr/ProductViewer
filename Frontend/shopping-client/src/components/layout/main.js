import Header from './header';
import Footer from './footer';

function Layout(props) {
  return (
    <>
      <div>
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-grow">
            <div className="max-w-6xl mx-auto px-4">{props.children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
